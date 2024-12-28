import { useState } from "react";
import FadeIn from "../animation/FadeIn";
import Asset from "../asset/AssetItem";
import { IOrderShort } from "@/types/dtos/Order.types";
import LoadMore, { PAGINATION_LIMIT } from "../shared/LoadMore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchOrders } from "@/utils/fetchers";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function OrdersList() {
  // session
  const { data: session, status } = useSession();

  // page
  const [page, setPage] = useState(1);

  // fetch orders
  const ordersQuery = useQuery<ApiResponse<IOrderShort[]>>({
    queryKey: ["orders", session?.user.memberId],
    queryFn: () =>
      fetchOrders(session?.user.memberId ?? "", {
        limit: page * PAGINATION_LIMIT,
      }),
    enabled: status === "authenticated",
  });

  const orders = ordersQuery.data?.data ?? [];
  const totalCount = ordersQuery.data?.totalCount ?? 0;

  return (
    ordersQuery.isSuccess && (
      <LoadMore
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        query={ordersQuery}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <FadeIn
              key={`order_${order.orderId}`}
              delay={(page === 1 ? 0.2 : 0) + (index % PAGINATION_LIMIT) * 0.05}
              className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
            >
              <Asset asset={order.asset} type="order" orderId={order.orderId} />
            </FadeIn>
          ))}
        </div>
      </LoadMore>
    )
  );
}
