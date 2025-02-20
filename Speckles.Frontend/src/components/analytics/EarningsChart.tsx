import { AnimatePresence } from "framer-motion";
import React, { Fragment } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/formatters";
import { ICurrency } from "@/types/dtos/Currency.types";
import Image from "next/image";
import { getAssetImage } from "@/utils/images";
import { IAssetShort } from "@/types/dtos/Asset.types";

const colors = ["#3C672D", "#4C8538", "#569A3D"];
// const colors = ["#3C672D", "#3C672D", "#3C672D"];

interface Props {
  data: {
    name: string;
    value: number;
    asset: IAssetShort;
    ordered: number;
    currency: ICurrency;
  }[];
}

export default function EarningsChart({ data }: Props) {
  if (data.length === 0) {
    data = [
      {
        name: "No earnings",
        asset: {
          assetId: "",
          currency: {
            currencyId: "",
            name: "USD",
            locale: "en-US",
          },
          thumbnail: {
            imageId: "",
            alt: "",
          },
          name: "No earnings",
          price: 0,
          tags: [],
        },
        currency: {
          currencyId: "",
          name: "USD",
          locale: "en-US",
        },
        ordered: 0,
        value: 1,
      },
    ];
  }

  return (
    <ResponsiveContainer width={250} height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={40}
          paddingAngle={0}
          dataKey="value"
          animationDuration={800}
          animationBegin={0}
          animationEasing="ease"
        >
          {data.map((_, index) => (
            <Cell key={`cell_${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} animationEasing="ease" />
      </PieChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) {
  const newPayload = payload![0].payload.payload;
  const isEmpty = payload![0].name === "No earnings";

  return (
    <AnimatePresence>
      {active && payload && payload.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 100, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          // style={{
          //   top: y + 20,
          //   left: x + 20,
          // }}
          className="flex gap-3 items-center bg-black-primary rounded-lg px-4 py-2 text-white"
        >
          {!isEmpty ? (
            <Fragment>
              <Image
                src={getAssetImage(
                  newPayload.asset.assetId,
                  newPayload.asset.thumbnail.imageId
                )}
                alt={newPayload.asset.name}
                width={50}
                height={30}
                className="rounded-lg"
              />
              <div>
                <div className="font-bold">
                  {payload[0].name} ({newPayload.ordered}x)
                </div>
                <div className="opacity-80 font-semibold">
                  {formatPrice(
                    newPayload.currency.locale,
                    newPayload.currency.name,
                    payload[0].value
                  )}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="opacity-80 font-semibold">No earnings</div>
          )}
          {/* <div className="absolute -left-2 m-auto top-0 bottom-0 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black-primary"></div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
