import { IEarning } from "@/types/Earning.types";
import { fetchStudioEarnings } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import EarningsChart from "./EarningsChart";
import SelectTime from "./SelectTime";

interface Props {
  studioId: string;
}

export default function Earnings({ studioId }: Props) {
  const fetchStudioEarningsRequest = useQuery({
    queryKey: ["studios", studioId, "earnings"],
    queryFn: () => fetchStudioEarnings(studioId.toString()),
  });

  const earnings = (fetchStudioEarningsRequest.data as IEarning[]) || [];

  const earningsChartData = earnings.map((earning) => ({
    name: earning.assetName,
    value: earning.totalAmount,
    currency: earning.asset.currency,
  }));

  const totalAmount = earningsChartData.reduce(
    (acc, earning) => acc + earning.value,
    0
  );

  const onTimeChange = (time: string) => {
    console.log(time);
  };

  return (
    fetchStudioEarningsRequest.isSuccess && (
      <div className="flex items-center w-1/2 bg-neutral-100 border border-black-primary border-opacity-10 rounded-lg">
        <EarningsChart data={earningsChartData} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div>Earnings</div>
            <div className="heading text-4xl">${totalAmount}</div>
          </div>

          <SelectTime onTimeChange={onTimeChange} />
        </div>
      </div>
    )
  );
}
