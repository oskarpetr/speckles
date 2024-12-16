"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { IOrder } from "@/types/Order.types";
import { formatDate, formatPrice, formatFileSize } from "@/utils/formatters";
import { fetchOrder } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { DownloadSimple, FileText } from "@phosphor-icons/react";
import { getAssetFileExtension } from "@/utils/images";
import Link from "next/link";
import Section from "@/components/shared/Section";
import FadeIn from "@/components/animation/FadeIn";
import RoundedButton from "@/components/shared/RoundedButton";

export default function OrderPage() {
  const { orderId } = useParams();

  // Fetch order
  const orderQuery = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => fetchOrder(orderId.toString()),
  });

  const order = orderQuery.data?.data as IOrder;

  return (
    <Layout>
      {orderQuery.isSuccess && (
        <Fragment>
          <Heading
            title={order.asset.name}
            subtitle={order.asset.description}
          />

          <div className="flex gap-16">
            <FadeIn delay={0.1} className="w-full">
              <Section title="Files" />

              <div className="flex flex-col gap-6 h-fit bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
                {order.asset.files.map((file, index) => (
                  <Fragment key={`file_${file.fileId}`}>
                    <FadeIn
                      delay={0.2 + index * 0.05}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={getAssetFileExtension(file.fileName)}
                          alt={file.fileName}
                          width={256}
                          height={0}
                          className="w-16"
                        />

                        <div>
                          <div className="font-bold text-lg">{file.name}</div>
                          <div className="opacity-50">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/api/download?assetId=${order.asset.assetId}&fileName=${file.fileName}`}
                      >
                        <RoundedButton
                          icon="DownloadSimple"
                          colorType="secondary"
                        />
                      </Link>
                      {/* <Link
                        href={`/api/download?assetId=${order.asset.assetId}&fileName=${file.fileName}`}
                        className="flex gap-2 items-center bg-neutral-200 hover:bg-neutral-300 transition-colors px-7 py-2.5 rounded-lg border border-black-primary border-opacity-10 font-semibold"
                      >
                        <DownloadSimple size={20} />
                        Download
                      </Link> */}
                    </FadeIn>

                    {index !== order.asset.files.length - 1 && (
                      <FadeIn delay={0.2 + index * 0.05}>
                        <div className="border-b border-black-primary border-opacity-10"></div>
                      </FadeIn>
                    )}
                  </Fragment>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="w-1/2">
              <Section title="Order summary" />

              <div className="flex flex-col gap-6 bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>Order date</div>
                    <div>{formatDate(order.date)}</div>
                  </div>

                  <div className="flex justify-between">
                    <div>Amount paid</div>
                    <div>
                      {formatPrice(order.asset.price, order.asset.currency)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>Payment method</div>
                    <div>{order.paymentMethod}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <button
                    className={
                      "bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-black-primary border-opacity-10 flex items-center justify-center gap-2 w-full rounded-lg py-[calc(1rem-1px)] text-green-primary font-bold transition-colors"
                    }
                  >
                    <FileText size={24} />
                    View Invoice
                  </button>

                  <button
                    className={
                      "bg-green-primary hover:bg-green-primary-hover flex items-center justify-center gap-2 w-full rounded-lg py-4 text-white font-bold transition-colors"
                    }
                  >
                    <DownloadSimple size={24} />
                    Download All
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Fragment>
      )}
    </Layout>
  );
}
