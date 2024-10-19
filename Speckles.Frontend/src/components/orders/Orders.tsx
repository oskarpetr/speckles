import { useQuery } from "@tanstack/react-query";
import FadeIn from "../anim/FadeIn";
import { fetchOrders } from "@/utils/fetchers";
import { IOrderShort } from "@/types/Order.types";
import Asset from "../assets/Asset";

export default function Orders() {
  return (
    <FadeIn delay={0.1}>
      <OrderList />
    </FadeIn>
  );
}

function OrderList() {
  const memberId = "0f44ee84-dcf2-483c-a084-102712b6b19e";

  const { data, error, isSuccess } = useQuery({
    queryKey: ["saved", memberId],
    queryFn: () => fetchOrders(memberId),
  });

  const orders = data as IOrderShort[];

  return (
    <div className="grid grid-cols-3 gap-6">
      {isSuccess &&
        orders.map((order, index) => (
          <FadeIn
            key={`asset_${order.asset.assetId}`}
            delay={0.2 + index * 0.05}
            className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
          >
            <Asset asset={order.asset} type="order" orderId={order.orderId} />
          </FadeIn>
        ))}
    </div>
  );
}
