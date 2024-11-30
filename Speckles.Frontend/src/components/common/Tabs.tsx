import { BEZIER_CURVE } from "@/utils/animation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";
import FadeIn from "../animation/FadeIn";
import { ITabItem } from "@/types/TabItem.types";

interface Props {
  items: ITabItem[];
}

export default function Tabs({ items }: Props) {
  const [selected, setSelected] = useState(items[0].title);

  return (
    <div className="flex flex-col gap-20">
      <FadeIn delay={0} className="flex gap-8">
        {items.map((item) => (
          <button
            key={`tab_${item}`}
            className={cn(
              "flex flex-col gap-1 transition-opacity",
              selected === item.title ? "opacity-100" : "opacity-50"
            )}
            onClick={() => setSelected(item.title)}
          >
            <div className="text-lg font-semibold">{item.title}</div>
            {selected === item.title && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 2 }}
                transition={{ duration: 0.2, ease: BEZIER_CURVE }}
                className="h-[1.5px] w-full rounded-full bg-black-primary bg-opacity-80"
              ></motion.div>
            )}
          </button>
        ))}
      </FadeIn>

      {items.find((x) => x.title === selected)?.content}
    </div>
  );
}
