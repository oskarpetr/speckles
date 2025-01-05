import EarningsChart from "./EarningsChart";
import { TIME_INTERVALS } from "./SelectTimeInterval";
import { useEffect, useState } from "react";
import SelectTimeInterval from "./SelectTimeInterval";
import { useStudioEarningsQuery } from "@/hooks/useApi";

interface Props {
  slug: string;
}

export default function Earnings({ slug }: Props) {
  // time interval
  const [timeInterval, setTimeInterval] = useState(TIME_INTERVALS[0]);

  // earnings query
  const studioEarningsQuery = useStudioEarningsQuery(slug, timeInterval);
  const earnings = studioEarningsQuery.data?.data ?? [];

  // earnings chart data
  const earningsChartData = earnings.map((earning) => ({
    name: earning.assetName,
    value: earning.totalAmount,
    asset: earning.asset,
    ordered: earning.ordered,
    currency: earning.asset.currency,
  }));

  // total amount
  const totalAmount = earningsChartData.reduce(
    (acc, earning) => acc + earning.value,
    0
  );

  useEffect(() => {
    studioEarningsQuery.refetch();
  }, [timeInterval]);

  return (
    studioEarningsQuery.isSuccess && (
      <div className="flex items-center w-full bg-neutral-100 border border-black-primary border-opacity-10 rounded-lg">
        <EarningsChart data={earningsChartData} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div>Earnings</div>
            <div className="heading text-4xl">${totalAmount.toFixed(2)}</div>
          </div>

          <SelectTimeInterval
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
          />
        </div>
      </div>
    )
  );
}
