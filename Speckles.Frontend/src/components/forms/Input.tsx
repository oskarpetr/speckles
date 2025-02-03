import { ChangeEvent, FocusEvent } from "react";
import FormError from "./FormError";
import Icon from "../shared/Icon";
import { cn } from "@/utils/cn";
import Section from "../shared/Section";

type Props = {
  title: string;
  name: string;
  onBlur?: (event: FocusEvent) => void;
  placeholder?: string;
  value: string;
  error?: string | undefined;
  touched?: boolean | undefined;
} & (
  | {
      type?: "text" | "email" | "password" | "number";
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      error?: string | undefined;
      icon?: string;
      autocomplete?: boolean;
    }
  | {
      type: "select";
      onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
      icon?: string;
      options: SelectOption[];
    }
);

export interface SelectOption {
  value: string;
  label: string;
}

export default function Input(p: Props) {
  let inputElement: JSX.Element | null = null;

  if (p.type !== "select") {
    inputElement = (
      <div className="relative flex items-center">
        {p.icon && (
          <Icon
            name="MagnifyingGlass"
            className="absolute ml-6 opacity-30"
            size={20}
            weight="bold"
          />
        )}
        <input
          key={p.name}
          type={p.type}
          name={p.name}
          className={cn(
            "focus:ring-4 ring-opacity-30 ring-green-primary transition-all outline-none w-full px-6 py-3 bg-black-primary bg-opacity-5 rounded-lg border border-black-primary border-opacity-10",
            p.icon ? "pl-[3.25rem]" : "pl-6"
          )}
          placeholder={p.placeholder}
          onChange={p.onChange}
          onBlur={p.onBlur}
          value={p.value}
          autoComplete={p.autocomplete ? "on" : "off"}
        />
      </div>
    );
  }

  if (p.type === "select") {
    inputElement = (
      <div className="relative flex items-center">
        <select
          key={p.name}
          name={p.name}
          value={p.value}
          onChange={p.onChange}
          onBlur={p.onBlur}
          className="cursor-pointer relative focus:ring-4 ring-opacity-30 ring-green-primary transition-all outline-none w-full px-6 py-3 bg-black-primary bg-opacity-5 rounded-lg border border-black-primary border-opacity-10 pl-6"
        >
          {p.placeholder && (
            <option value="" disabled>
              {p.placeholder}
            </option>
          )}
          {p.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="CaretDown" size={20} className="absolute right-4" />
      </div>
    );
  }

  return (
    <Section title={p.title}>
      {inputElement}

      <FormError error={p.error} touched={p.touched} />
    </Section>
  );
}
