import { useState } from "react";
import SalesChart from "./SalesChart";
import SelectTimeInterval, { timeIntervals } from "./SelectTimeInterval";

export default function Sales() {
  const data = [
    {
      name: "10/17",
      value: 24,
    },
    {
      name: "10/18",
      value: 54,
    },
    {
      name: "10/19",
      value: 33,
    },
    {
      name: "10/20",
      value: 54,
    },
    {
      name: "10/21",
      value: 34,
    },
    {
      name: "10/23",
      value: 23,
    },
    {
      name: "10/24",
      value: 53,
    },
  ];

  const [timeInterval, setTimeInterval] = useState(timeIntervals[0]);

  return (
    <div className="flex flex-col w-full p-8 gap-6 bg-neutral-100 border border-black-primary border-opacity-10 rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <div>Sales Trend</div>
          <div className="heading text-4xl">435</div>
        </div>

        <SelectTimeInterval
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
        />
      </div>

      <SalesChart data={data} />
    </div>
  );
}
