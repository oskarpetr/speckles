"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { IOrder } from "@/types/dtos/Order.types";
import { useParams } from "next/navigation";
import { Fragment, useRef } from "react";
import LayoutSection from "@/components/layout/LayoutSection";
import html2pdf from "html2pdf.js";
import Button from "@/components/shared/Button";
import { formatDate } from "@/utils/formatters";
import Section from "@/components/shared/Section";
import { useOrderQuery } from "@/hooks/useApi";

export default function InvoicePage() {
  // orderId param
  const { orderId } = useParams();

  // fetch order
  const orderQuery = useOrderQuery(orderId as string);
  const order = orderQuery.data?.data as IOrder;

  const invoiceRef = useRef<HTMLDivElement>(null);

  const downloadInvoice = () => {
    var opt = {
      margin: 0,
      filename: `${order.asset.name}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 10 },
    };
    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  return (
    <Layout>
      <LayoutSection>
        {orderQuery.isSuccess && (
          <Fragment>
            <Heading
              title={order.asset.name}
              subtitle={order.asset.description}
            />

            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <div
                ref={invoiceRef}
                className="w-full aspect-w-1 aspect-h-[1.41]"
              >
                {/* className="[&_*]:text-[1rem]" */}
                <div className="bg-green-primary px-16 py-8">
                  <SpecklesLogoPDF />
                </div>

                <div className="px-16 py-8">
                  <Heading title="Invoice" />
                  {/* <div className="text-sm">Order {order.orderId}</div> */}

                  <div className="flex w-full gap-8 mt-8">
                    <div className="w-full h-full border-r border-neutral-200 pr-8">
                      <div>
                        <Section title="Issued">
                          <div>{formatDate(order.date, true)}</div>
                        </Section>
                      </div>
                    </div>

                    <div className="w-full border-r border-neutral-200 pr-8">
                      <div>
                        <Section title="Billed to">
                          <div>Oskar Petr</div>
                          <div>Oskar Petr</div>
                          <div>Oskar Petr</div>
                          <div>Oskar Petr</div>
                        </Section>
                      </div>
                    </div>

                    <div className="w-full">
                      <Section title="Order Id">
                        <div className="">{order.orderId}</div>
                      </Section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={downloadInvoice} text="Download" />
          </Fragment>
        )}
      </LayoutSection>
    </Layout>
  );
}

function SpecklesLogoPDF() {
  return (
    <div className="flex items-center gap-2 w-fit">
      <img src="/images/Logo.png" alt="Speckles Logo" width={20} height={20} />
      <div className="text-white font-bold text-xl !tracking-tight">
        Speckles
      </div>
    </div>
  );
}
