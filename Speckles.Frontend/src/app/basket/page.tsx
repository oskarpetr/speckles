"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import { useBasketQuery } from "@/hooks/useApi";
import Basket from "@/components/basket/Basket";

export default function BasketPage() {
  // fetch basket
  const basketQuery = useBasketQuery();
  const basket = basketQuery.data?.data ?? [];

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Basket" />

        <Basket basket={basketQuery.isSuccess ? basket : []} />
      </LayoutSection>
    </Layout>
  );
}
