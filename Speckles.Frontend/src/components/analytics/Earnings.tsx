import { IEarning } from "@/types/Earning.types";
import { fetchStudioEarnings } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import EarningsChart from "./EarningsChart";
import { timeIntervals } from "./SelectTimeInterval";
import { useEffect, useState } from "react";
import SelectTimeInterval from "./SelectTimeInterval";

interface Props {
  studioId: string;
}

export default function Earnings({ studioId }: Props) {
  const [timeInterval, setTimeInterval] = useState(timeIntervals[0]);

  const studioEarningQuery = useQuery({
    queryKey: ["studios", studioId, "earnings"],
    queryFn: () => fetchStudioEarnings(studioId.toString(), timeInterval),
  });

  const earnings = (studioEarningQuery.data.data as IEarning[]) || [];

  const earningsChartData = earnings.map((earning) => ({
    name: earning.assetName,
    value: earning.totalAmount,
    asset: earning.asset,
    ordered: earning.ordered,
    currency: earning.asset.currency,
  }));

  const totalAmount = earningsChartData.reduce(
    (acc, earning) => acc + earning.value,
    0
  );

  useEffect(() => {
    studioEarningQuery.refetch();
  }, [timeInterval]);

  return (
    studioEarningQuery.isSuccess && (
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
