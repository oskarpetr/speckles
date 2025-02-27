import { useState } from "react";
import SalesChart from "./SalesChart";
import SelectTimeInterval, { TIME_INTERVALS } from "./SelectTimeInterval";
import { useStudioSalesQuery } from "@/hooks/useApi";
import { format } from "date-fns";
import { ISale } from "@/types/dtos/Sale.types";

interface Props {
  slug: string;
}

export default function Sales({ slug }: Props) {
  // time interval state
  const [timeInterval, setTimeInterval] = useState(TIME_INTERVALS[1]);

  // sales query
  const studioSalesQuery = useStudioSalesQuery(slug, timeInterval);
  const sales = studioSalesQuery.data?.data ?? [];

  // sales formatted
  const formatIntervalDateLabel = (date: Date) => {
    if (timeInterval === "1d") {
      return format(date, "H") + "h";
    } else if (timeInterval === "1w") {
      return format(date, "E");
    } else if (timeInterval === "1m") {
      return format(date, "MMM dd");
    } else if (timeInterval === "1y") {
      return format(date, "MMM");
    } else if (timeInterval === "all time") {
      return format(date, "yyyy");
    }
  };

  const formatIntervalDateTooltip = (date: Date) => {
    if (timeInterval === "1d") {
      return format(date, "dd MMMM, HH:00");
    } else if (timeInterval === "1w") {
      return format(date, "dd MMMM, yyyy");
    } else if (timeInterval === "1m") {
      return format(date, "dd MMMM, yyyy");
    } else if (timeInterval === "1y") {
      return format(date, "MMMM yyyy");
    } else if (timeInterval === "all time") {
      return format(date, "yyyy");
    }
  };

  const salesFormatted: ISale[] = sales.map((sale) => ({
    date: sale.date,
    dateLabel: formatIntervalDateLabel(new Date(sale.date)),
    dateTooltip: formatIntervalDateTooltip(new Date(sale.date)),
    sales: sale.sales,
  }));

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

      <SalesChart data={salesFormatted} />
    </div>
  );
}
