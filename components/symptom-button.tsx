type SymptomButtonProps = {
  label: string;
  onClick?: (label: string) => void;
};

export function SymptomButton({ label, onClick }: SymptomButtonProps) {
  return (
    <button className="symptom-button" onClick={() => onClick?.(label)} type="button">
      {label}
    </button>
  );
}
