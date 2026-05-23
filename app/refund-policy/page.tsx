import { LegalPage } from "@/components/legal-page";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="May 23, 2026"
      sections={[
        {
          heading: "Digital products",
          body: "HealthMatchAI sells digital educational reports and tools. One-time digital reports may be non-refundable once generated or downloaded, except where required by applicable law."
        },
        {
          heading: "Access not delivered",
          body: "If payment succeeds but access to the paid tool is not delivered within a reasonable time, contact support@healthmatchai.com. We will verify the payment and restore access or issue a refund as appropriate."
        },
        {
          heading: "Subscriptions",
          body: "Subscription billing is not yet enabled. Once subscription billing is available, subscriptions can be cancelled through the billing flow. Subscription refunds will follow Creem's refund policies and applicable law."
        },
        {
          heading: "Refund processing",
          body: "Refunds are processed through Creem, our payment provider. Processing times depend on Creem and your payment method. Refund handling may depend on Creem policies and applicable consumer protection laws."
        },
        {
          heading: "Contact",
          body: "For refund requests or questions about your purchase, contact support@healthmatchai.com."
        }
      ]}
    />
  );
}
