import { ChangeEvent, FocusEvent, Fragment } from "react";
import FormError from "./FormError";
import Icon from "../shared/Icon";
import { cn } from "@/utils/cn";

interface Props {
  type?: "text" | "email" | "password";
  name: string;
  onChange: (event: ChangeEvent) => void;
  onBlur: (event: FocusEvent) => void;
  placeholder: string;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  icon?: string;
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
  icon,
}: Props) {
  return (
    <Fragment>
      <div className="relative flex items-center">
        {icon && (
          <Icon
            name="MagnifyingGlass"
            className="absolute ml-6 opacity-30"
            size={20}
            weight="bold"
          />
        )}
        <input
          key={name}
          type={type}
          name={name}
          className={cn(
            "focus:ring-4 ring-opacity-5 ring-neutral-600 transition-all outline-none w-full px-6 py-3 bg-black-primary bg-opacity-5 rounded-lg border border-black-primary border-opacity-10",
            icon ? "pl-[3.25rem]" : "pl-6"
          )}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>

      <FormError error={error} touched={touched} />
    </Fragment>
  );
}
