type DisclaimerBoxProps = {
  text?: string;
};

export const SAFETY_DISCLAIMER =
  "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only and does not constitute insurance advice. For insurance enrollment, speak with a licensed insurance agent or broker.";

export function DisclaimerBox({ text = SAFETY_DISCLAIMER }: DisclaimerBoxProps) {
  return <div className="disclaimer-box">{text}</div>;
}
