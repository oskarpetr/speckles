import { useState } from "react";
import FadeIn from "../animation/FadeIn";
import Asset from "../asset/AssetItem";
import LoadMore, { PAGINATION_LIMIT } from "../shared/LoadMore";
import Grid from "../shared/Grid";
import { useOrdersQuery } from "@/hooks/useApi";

export default function OrdersList() {
  // page
  const [page, setPage] = useState(1);

  // fetch orders
  const ordersQuery = useOrdersQuery(page);
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
        <Grid>
          {orders.map((order, index) => (
            <FadeIn
              key={`order_${order.orderId}`}
              delay={(page === 1 ? 0.2 : 0) + (index % PAGINATION_LIMIT) * 0.05}
              className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
            >
              <Asset asset={order.asset} type="order" orderId={order.orderId} />
            </FadeIn>
          ))}
        </Grid>
      </LoadMore>
    )
  );
}
