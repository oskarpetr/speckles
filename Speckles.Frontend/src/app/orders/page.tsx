"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import Orders from "@/components/orders/Orders";
import { fetchOrderCount } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();

  const orderCountQuery = useQuery({
    queryKey: ["orders", session?.user.memberId, "count"],
    queryFn: () => fetchOrderCount(session?.user.memberId ?? ""),
    enabled: !!session,
  });

  const orderCount = orderCountQuery.data?.data.count ?? 0;

  return (
    <Layout>
      <Heading
        title="Your assets"
        subtitle={`You have purchased ${orderCount} assets`}
      />

      {orderCountQuery.isSuccess && <Orders orderCount={orderCount} />}
    </Layout>
  );
}
