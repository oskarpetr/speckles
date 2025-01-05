import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

export const TIME_INTERVALS = ["1d", "1w", "1m", "1y", "all time"];

interface Props {
  timeInterval: string;
  setTimeInterval: Dispatch<SetStateAction<string>>;
}

export default function SelectTimeInterval({
  timeInterval,
  setTimeInterval,
}: Props) {
  return (
    <div className="flex p-0.5 gap-1 h-fit bg-green-primary bg-opacity-10 border border-black-primary border-opacity-10 rounded-full">
      {TIME_INTERVALS.map((time) => (
        <button
          key={time}
          className={cn(
            "px-5 py-2 rounded-full w-fit transition-colors font-semibold",
            timeInterval === time
              ? "bg-green-primary text-white"
              : "bg-transparent text-green-primary"
          )}
          onClick={() => setTimeInterval(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
