"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { IOrder } from "@/types/dtos/Order.types";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import Section from "@/components/shared/Section";
import OrderFiles from "@/components/orders/OrderFiles";
import OrderSummary from "@/components/orders/OrderSummary";
import LayoutSection from "@/components/layout/LayoutSection";
import { useOrderQuery } from "@/hooks/useApi";

export default function OrderPage() {
  // orderId param
  const { orderId } = useParams();

  // fetch order
  const orderQuery = useOrderQuery(orderId as string);
  const order = orderQuery.data?.data as IOrder;

  return (
    <Layout>
      <LayoutSection>
        {orderQuery.isSuccess && (
          <Fragment>
            <Heading
              title={order.asset.name}
              subtitle={order.asset.description}
            />

            <div className="flex gap-16">
              <Section title="Files" delay={0.1}>
                <OrderFiles order={order} />
              </Section>

              <Section title="Order summary" delay={0.2} className="w-1/2">
                <OrderSummary order={order} />
              </Section>
            </div>
          </Fragment>
        )}
      </LayoutSection>
    </Layout>
  );
}
