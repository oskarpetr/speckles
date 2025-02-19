import { Dispatch, SetStateAction } from "react";
import Button from "../shared/Button";

interface Props {
  loading: boolean;
  buttonText: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  maxSteps: number;
}

export default function FormButtons({
  loading,
  buttonText,
  step,
  setStep,
  maxSteps,
}: Props) {
  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex gap-6 mt-8">
      {step !== 1 && (
        <Button
          icon={{ name: "ArrowLeft" }}
          text="Back"
          type="cancel"
          onClick={goBack}
        />
      )}

      <Button
        icon={{ name: "ArrowRight", iconDirection: "right" }}
        text={step === maxSteps ? buttonText : "Continue"}
        loading={loading}
        fullWidth
      />
    </div>
  );
}

export const goForward = (
  step: number,
  setStep: Dispatch<SetStateAction<number>>,
  maxSteps: number
) => {
  if (step !== maxSteps) {
    setStep((prev) => prev + 1);
  }
};
