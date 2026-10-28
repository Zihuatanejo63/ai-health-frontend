"use client";

import { Card, PrimaryButton } from "@/components/app-ui";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="app-page">
      <Card className="error-boundary-card">
        <h1>Something went wrong</h1>
        <p>
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="button-pair">
          <button className="btn-primary" onClick={() => reset()} type="button">
            Try again
          </button>
          <PrimaryButton href="/">Go home</PrimaryButton>
        </div>
      </Card>
    </section>
  );
}
