"use client";

import Basket from "@/components/basket/Basket";
import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";

export default function BasketPage() {
  return (
    <Layout>
      <Heading title="Basket" />
      <Basket />
    </Layout>
  );
}
