import { ChangeEvent, FocusEvent, useRef } from "react";
import FormError from "./FormError";
import Icon from "../shared/Icon";
import { cn } from "@/utils/cn";
import Section from "../shared/Section";

type Props = {
  title?: string;
  name: string;
  onBlur?: (event: FocusEvent) => void;
  placeholder?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
} & (
  | {
      type?: "text" | "email" | "password" | "number";
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      icon?: string;
      value: string;
      autocomplete?: boolean;
    }
  | {
      type: "textarea";
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      value: string;
      autocomplete?: boolean;
    }
  | {
      type: "select";
      onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
      icon?: string;
      value: string;
      options: SelectOption[];
    }
  | {
      type: "file";
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      value: File;
      accept: string;
      acceptText: string;
      chooseText: string;
      uploadedText: string;
    }
  | {
      type: "toggle";
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      value: boolean;
    }
);

export interface SelectOption {
  value: string;
  label: string;
}

export default function Input(p: Props) {
  let inputElement: JSX.Element | null = null;
  const inputRef = useRef<HTMLInputElement>(null);

  if (
    p.type !== "textarea" &&
    p.type !== "select" &&
    p.type !== "file" &&
    p.type !== "toggle"
  ) {
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
            "focus:ring-4 ring-opacity-30 ring-green-primary transition-all outline-none min-w-full px-6 py-3 bg-black-primary bg-opacity-5 rounded-lg border border-black-primary border-opacity-10",
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
  } else if (p.type === "textarea") {
    inputElement = (
      <textarea
        key={p.name}
        name={p.name}
        className={cn(
          "focus:ring-4 ring-opacity-30 ring-green-primary transition-all outline-none min-w-full px-6 py-3 bg-black-primary bg-opacity-5 rounded-lg border border-black-primary border-opacity-10"
        )}
        placeholder={p.placeholder}
        onChange={p.onChange}
        onBlur={p.onBlur}
        value={p.value}
        autoComplete={p.autocomplete ? "on" : "off"}
        rows={3}
      />
    );
  } else if (p.type === "select") {
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
  } else if (p.type === "file") {
    const isFileUploaded = p.value.name !== undefined;

    inputElement = (
      <div
        onClick={() => inputRef.current?.click()}
        className="h-36 flex justify-center cursor-pointer relative focus:ring-4 ring-opacity-30 ring-green-primary transition-all outline-none w-full p-6 bg-black-primary bg-opacity-5 hover:bg-opacity-10 rounded-lg border-2 border-dashed border-black-primary border-opacity-10 pl-6"
      >
        {isFileUploaded ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Icon name="Check" size={28} />
            <div className="flex flex-col items-center">
              <div className="font-semibold">{p.uploadedText}</div>
              <div className="text-sm opacity-50">{p.value.name}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Icon name="Upload" size={28} />
            <div className="flex flex-col items-center">
              <div className="font-semibold">{p.chooseText}</div>
              <div className="text-sm opacity-50">{p.acceptText}</div>
            </div>
          </div>
        )}

        <input
          key={p.name}
          type="file"
          name={p.name}
          className="hidden"
          accept={p.accept}
          ref={inputRef}
          onChange={p.onChange}
        />
      </div>
    );
  } else if (p.type === "toggle") {
    inputElement = (
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          name={p.name}
          checked={p.value}
          onChange={p.onChange}
          className="w-6 h-6"
        />

        <div>{p.value ? "On" : "Off"}</div>
      </div>
    );
  }

  if (p.title) {
    return (
      <Section title={p.title} chevron={false}>
        {inputElement}

        <FormError error={p.error} touched={p.touched} />
      </Section>
    );
  }

  return (
    <div>
      {inputElement}

      <FormError error={p.error} touched={p.touched} />
    </div>
  );
}
