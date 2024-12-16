import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import { fetchOrders } from "@/utils/fetchers";
import { IOrderShort } from "@/types/Order.types";
import Asset from "../asset/Asset";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Icon from "../shared/Icon";

interface Props {
  orderCount: number;
}

export default function Orders({ orderCount }: Props) {
  return (
    <FadeIn delay={0.1}>
      <OrderList orderCount={orderCount} />
    </FadeIn>
  );
}

function OrderList({ orderCount }: Props) {
  // session
  const { data: session } = useSession();

  // pagination
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(orderCount / 9);

  // previous page
  const previousPage = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  // next page
  const nextPage = () => {
    setPage((prev) => (prev === pageCount ? prev : prev + 1));
  };

  // fetch orders
  const ordersQuery = useQuery({
    queryKey: ["orders", session?.user.memberId],
    queryFn: () =>
      fetchOrders(session?.user.memberId ?? "", { offset: page * 9, limit: 9 }),
    enabled: !!session,
  });

  const orders = ordersQuery.data?.data as IOrderShort[];

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    ordersQuery.refetch();
  }, [page]);
  console.log(Array.from({ length: pageCount }, (_, index) => index + 1));

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersQuery.isSuccess &&
          orders.map((order, index) => (
            <FadeIn
              key={`order_${order.orderId}`}
              delay={0.2 + index * 0.05}
              className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
            >
              <Asset asset={order.asset} type="order" orderId={order.orderId} />
            </FadeIn>
          ))}
      </div>

      <div className="flex gap-1 justify-center">
        <button
          className={
            "px-3 py-2 border rounded-lg tabular-nums transition-colors bg-neutral-100 border-neutral-200 hover:bg-neutral-200"
          }
          onClick={previousPage}
        >
          <Icon name="CaretLeft" size={20} />
        </button>

        {Array.from({ length: pageCount }, (_, index) => index + 1)
          .slice(
            Math.max(0, page - 3),
            Math.min(pageCount + 2, Math.max(5, page + 2))
          )
          .map((currentPage) => (
            <button
              key={`page_${currentPage}`}
              className={cn(
                "px-4 py-2 border rounded-lg tabular-nums transition-colors",
                page === currentPage
                  ? "bg-green-primary hover:bg-green-primary-hover text-white font-bold"
                  : "bg-neutral-100 border-neutral-200 hover:bg-neutral-200"
              )}
              onClick={() => setPage(currentPage)}
            >
              {currentPage}
            </button>
          ))}

        <button
          className={
            "px-3 py-2 border rounded-lg tabular-nums transition-colors bg-neutral-100 border-neutral-200 hover:bg-neutral-200"
          }
          onClick={nextPage}
        >
          <Icon name="CaretRight" size={20} />
        </button>
      </div>
    </div>
  );
}
