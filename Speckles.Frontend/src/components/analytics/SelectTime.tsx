import { cn } from "@/utils/cn";
import { useState } from "react";

export const timeIntervals = ["1d", "1w", "1m", "1y", "all time"];

interface Props {
  onTimeChange: (time: string) => void;
}

export default function SelectTime({ onTimeChange }: Props) {
  const [active, setActive] = useState(timeIntervals[0]);

  const onChange = (time: string) => {
    setActive(time);
    onTimeChange(time);
  };

  return (
    <div className="flex p-0.5 gap-1 bg-green-primary bg-opacity-10 border border-black-primary border-opacity-10 rounded-full">
      {timeIntervals.map((time) => (
        <button
          key={time}
          className={cn(
            "px-5 py-2 rounded-full w-fit transition-colors font-semibold",
            active === time
              ? "bg-green-primary text-white"
              : "bg-transparent text-green-primary"
          )}
          onClick={() => onChange(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
