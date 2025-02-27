import { AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/formatters";
import { ISale } from "@/types/dtos/Sale.types";

interface Props {
  data: ISale[];
}

export default function SalesChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={800} height={150} data={data}>
        <XAxis
          dataKey="dateLabel"
          tickMargin={15}
          // padding={{ left: 5, right: 5 }}
          minTickGap={20}
        />
        <YAxis tickMargin={15} />
        <Tooltip content={<CustomTooltip />} animationEasing="ease" />
        <Area
          type="monotone"
          dataKey="sales"
          fill="#3C672D"
          stroke="#2D541F"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease"
        />
      </AreaChart>
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
  return (
    <AnimatePresence>
      {active && payload && payload.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 100, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="bg-black-primary rounded-lg px-4 py-2 text-white"
        >
          <div className="font-bold">{payload[0].payload.dateTooltip}</div>
          <div className="opacity-80 font-semibold">
            {payload[0].value} {payload[0].value === 1 ? "sale" : "sales"}
          </div>
          {/* <div className="absolute -left-2 m-auto top-0 bottom-0 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black-primary"></div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
