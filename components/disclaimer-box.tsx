type DisclaimerBoxProps = {
  text?: string;
};

export const SAFETY_DISCLAIMER =
  "HealthMatchAI does not diagnose, prescribe, or replace professional medical care. If you have severe symptoms such as chest pain, trouble breathing, confusion, severe dehydration, or other emergency signs, seek urgent medical help.";

export function DisclaimerBox({ text = SAFETY_DISCLAIMER }: DisclaimerBoxProps) {
  return <div className="disclaimer-box">{text}</div>;
}
