"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import Orders from "@/components/orders/Orders";

export default function OrdersPage() {
  return (
    <Layout>
      <Heading title="Orders" />
      <Orders />
    </Layout>
  );
}
