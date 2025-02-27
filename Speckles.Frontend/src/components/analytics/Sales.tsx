import { useState } from "react";
import SalesChart from "./SalesChart";
import SelectTimeInterval, { TIME_INTERVALS } from "./SelectTimeInterval";
import { useStudioSalesQuery } from "@/hooks/useApi";
import { format } from "date-fns";
import { ISale } from "@/types/dtos/Sale.types";
import {
  formatIntervalDateLabel,
  formatIntervalDateTooltip,
} from "@/utils/formatters";

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
  const salesFormatted: ISale[] = sales.map((sale) => ({
    date: sale.date,
    dateLabel: formatIntervalDateLabel(new Date(sale.date), timeInterval),
    dateTooltip: formatIntervalDateTooltip(new Date(sale.date), timeInterval),
    sales: sale.sales,
  }));

  const totalSales = salesFormatted.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <div className="flex flex-col w-full p-8 gap-6 bg-neutral-100 border border-black-primary border-opacity-10 rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <div>Sales Trend</div>
          <div className="heading text-4xl">{totalSales}</div>
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
