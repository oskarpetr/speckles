import { AnimatePresence } from "framer-motion";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/formatters";
import { ICurrency } from "@/types/Currency.types";

// const colors = ["#3C672D", "#4C8538", "#569A3D"];
const colors = ["#3C672D", "#3C672D", "#3C672D"];

interface Props {
  data: { name: string; value: number; currency: ICurrency }[];
}

export default function EarningsChart({ data }: Props) {
  return (
    <ResponsiveContainer width={250} height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          paddingAngle={0}
          dataKey="value"
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
  active: boolean;
  payload: any[];
}) {
  const currency = payload[0]?.payload.payload.currency;

  return (
    <AnimatePresence>
      {active && payload && payload.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 100, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="bg-black-primary rounded-lg px-4 py-2 text-white"
        >
          <div className="font-bold">{payload[0].name}</div>
          <div className="opacity-80 font-semibold">
            {formatPrice(payload[0].value, currency)}
          </div>
          {/* <div className="absolute -left-2 m-auto top-0 bottom-0 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black-primary"></div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
