type DisclaimerBannerProps = {
  text?: string;
};

export const DEFAULT_DISCLAIMER =
  "Medical disclaimer: AI Health Match does not provide medical diagnosis. " +
  "This information is for triage support only and does not replace professional medical advice. " +
  "If you are in danger or have severe symptoms, seek emergency care immediately.";

export function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  return <p className="disclaimer-banner">{text ?? DEFAULT_DISCLAIMER}</p>;
}
