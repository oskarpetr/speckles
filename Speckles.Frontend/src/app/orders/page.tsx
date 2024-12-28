"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import OrderList from "@/components/orders/OrderList";
import LayoutSection from "@/components/layout/LayoutSection";

export default function OrdersPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading
          title="Your assets"
          // subtitle={`You have purchased ${totalCount} assets`}
        />
        <OrderList />
      </LayoutSection>
    </Layout>
  );
}
