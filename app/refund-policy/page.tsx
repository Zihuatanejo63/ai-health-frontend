import { LegalPage } from "@/components/legal-page";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="May 24, 2026"
      sections={[
        {
          heading: "Subscriptions",
          body: [
            "HealthMatchAI offers a Plus subscription at $9.99/month. Subscriptions can be cancelled at any time through your account settings or by contacting support.",
            "After cancellation, access to Plus features remains until the end of the current billing period. You will not be charged again after cancellation.",
          ]
        },
        {
          heading: "Refund requests",
          body: "Refund requests may be reviewed within 7 days of purchase. To request a refund, contact support@healthmatchai.com. Approved refunds are processed through Creem, our payment provider."
        },
        {
          heading: "Access issues",
          body: "If payment succeeds but Plus access is not delivered within a reasonable time, contact support@healthmatchai.com. We will verify the payment and restore access or issue a refund as appropriate."
        },
        {
          heading: "Refund processing",
          body: "Refunds are processed through Creem. Processing times depend on Creem and your payment method. Refund handling may depend on Creem policies and applicable consumer protection laws."
        },
        {
          heading: "Contact",
          body: "For refund requests or questions about your purchase, contact support@healthmatchai.com."
        }
      ]}
    />
  );
}
