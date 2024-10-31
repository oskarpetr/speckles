import { ChangeEvent, FocusEvent, Fragment } from "react";
import FadeIn from "../animation/FadeIn";

interface Props {
  type?: "text" | "email" | "password";
  name: string;
  onChange: (event: ChangeEvent) => void;
  onBlur: (event: FocusEvent) => void;
  placeholder: string;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
}

export default function Input({
  type = "text",
  name,
  placeholder,
  onChange,
  onBlur,
  value = "",
  error,
  touched,
}: Props) {
  return (
    <Fragment>
      <input
        key={name}
        type={type}
        name={name}
        className="w-full px-6 py-3 bg-black-primary bg-opacity-5 transition-[outline] outline outline-2 outline-transparent focus:outline-green-primary rounded-lg border border-black-primary border-opacity-10"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && touched && (
        <FadeIn>
          <p className="mt-2 text-red-500 text-sm font-semibold">{error}</p>
        </FadeIn>
      )}
    </Fragment>
  );
}
