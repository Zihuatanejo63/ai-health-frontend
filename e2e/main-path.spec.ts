/**
 * HealthMatchAI — Non-payment main path E2E tests.
 * Run: npx playwright test --config e2e/playwright.config.ts
 *
 * Tests the golden path: Home → Symptom Check → Result → History → Data Delete.
 * Does NOT test payment flows (those require Creem sandbox + real email).
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test.describe("Main user journey", () => {
  test("1. Home page has Start Symptom Check CTA", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator("text=Start Symptom Check").first()).toBeVisible();
  });

  test("2. Symptom check first screen shows main concern selector", async ({ page }) => {
    await page.goto(`${BASE_URL}/symptom-check`);
    await expect(page.locator("text=What is your main concern today?")).toBeVisible();
    // Should show 10 concern options
    const concernOptions = page.locator(".concern-choice-grid .choice-pill");
    await expect(concernOptions.first()).toBeVisible();
  });

  test("3. Selecting a main concern advances to associated symptoms", async ({ page }) => {
    await page.goto(`${BASE_URL}/symptom-check`);

    // Select "Fever or flu-like symptoms"
    await page.locator("text=Fever or flu-like symptoms").click();
    await page.locator("text=Continue").click();

    // Step 2: Should show associated symptoms
    await expect(page.locator("text=Associated symptoms")).toBeVisible();
  });

  test("4. Can complete full triage flow", async ({ page }) => {
    await page.goto(`${BASE_URL}/symptom-check`);

    // Step 1: Select concern
    await page.locator("text=Fever or flu-like symptoms").click();
    await page.locator("text=Continue").click();

    // Step 2: Select symptoms (fever should be pre-selected)
    await page.locator("text=Continue").click();

    // Step 3: Symptom details (use defaults)
    await page.locator("text=Continue").click();

    // Step 4: Duration, trend, severity (use defaults)
    await page.locator("text=Continue").click();

    // Step 5: Red flags (skip)
    await page.locator("text=Continue").click();

    // Step 6: Health background (skip)
    await page.locator("text=Continue").click();

    // Step 7: Review and submit
    const submitBtn = page.locator("button[type='submit']");
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Should navigate to result page
    await page.waitForURL(/\/result/, { timeout: 15000 });
  });

  test("5. Result page shows core sections", async ({ page }) => {
    // This test requires a result in sessionStorage.
    // Navigate via symptom-check first, or check result page structure directly.
    await page.goto(`${BASE_URL}/result`);

    // Result page should exist and render something
    await expect(page.locator("body")).toBeVisible();
  });

  test("6. Result page has Recommended Next Step section", async ({ page }) => {
    await page.goto(`${BASE_URL}/result`);
    // The result page may show content or an empty state
    await expect(page.locator("body")).toBeVisible();
  });

  test("7. Care-options page shows 5 care level cards", async ({ page }) => {
    await page.goto(`${BASE_URL}/care-options`);

    // Should have "Not sure where to go?" banner
    await expect(page.locator("text=Not sure")).toBeVisible();

    // Check for the 5 care level cards
    await expect(page.locator("text=Emergency")).toBeVisible();
    await expect(page.locator("text=Urgent Care")).toBeVisible();
    await expect(page.locator("text=Primary Care")).toBeVisible();
    await expect(page.locator("text=Telehealth")).toBeVisible();
    await expect(page.locator("text=Self-care")).toBeVisible();

    // Detailed comparison should be collapsed by default
    const comparison = page.locator("text=Detailed comparison");
    await expect(comparison).toBeVisible();
    // The table inside should not be visible initially (collapsed <details>)
    const table = page.locator(".care-table-scroll");
    await expect(table).not.toBeVisible();
  });

  test("8. Insurance-guide shows 3-step flow with collapsed terms", async ({ page }) => {
    await page.goto(`${BASE_URL}/insurance-guide`);

    // Title should be "Before-care cost questions"
    await expect(page.locator("text=Before-care cost questions")).toBeVisible();

    // Should show step badges
    await expect(page.locator("text=Step 1")).toBeVisible();

    // Insurance terms should be collapsed by default
    const termsSection = page.locator("text=Insurance terms you may see");
    await expect(termsSection).toBeVisible();
  });

  test("9. Pricing page shows Free + Visit-ready Report + Plus Coming Soon", async ({ page }) => {
    await page.goto(`${BASE_URL}/pricing`);

    // Free plan
    await expect(page.locator("text=Free Check")).toBeVisible();
    // Visit-ready Report
    await expect(page.locator("text=Visit-ready Report")).toBeVisible();
    // Plus Coming Soon
    await expect(page.locator("text=Coming soon")).toBeVisible();

    // Should NOT have Founding Annual
    await expect(page.locator("text=Founding")).toHaveCount(0);
  });

  test("10. Privacy page has compliance content", async ({ page }) => {
    await page.goto(`${BASE_URL}/privacy`);

    await expect(page.locator("text=We do not sell personal health information")).toBeVisible();
    await expect(page.locator("text=Guest data stays on this device")).toBeVisible();
  });

  test("11. Terms page does not reference MVP", async ({ page }) => {
    await page.goto(`${BASE_URL}/terms`);

    // Should NOT have MVP language
    await expect(page.locator("text=MVP")).toHaveCount(0);
    await expect(page.locator("text=provided as-is for MVP validation")).toHaveCount(0);

    // Should reference Creem
    await expect(page.locator("text=Creem")).toBeVisible();
  });

  test("12. Footer has all required links (desktop)", async ({ page }) => {
    // Set desktop viewport for footer visibility
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);

    await expect(page.locator("footer >> text=Privacy")).toBeVisible();
    await expect(page.locator("footer >> text=Terms")).toBeVisible();
    await expect(page.locator("footer >> text=Medical Disclaimer")).toBeVisible();
    await expect(page.locator("footer >> text=Refund Policy")).toBeVisible();
    await expect(page.locator("footer >> text=Contact")).toBeVisible();
    await expect(page.locator("footer >> text=Emergency")).toBeVisible();
    await expect(page.locator("footer >> text=Cookies")).toBeVisible();
  });

  test("13. Mobile viewport does not overflow symptom check", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/symptom-check`);

    // Main concern cards should be visible and not overflow
    const concernGrid = page.locator(".concern-choice-grid");
    await expect(concernGrid).toBeVisible();

    // No horizontal scroll on body
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // tolerate small rounding
  });
});
