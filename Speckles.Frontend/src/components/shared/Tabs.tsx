import { BEZIER_CURVE } from "@/utils/animation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useState, ReactElement } from "react";
import FadeIn from "../animation/FadeIn";
import { Props as TabItemProps } from "./TabItem";

interface TabsProps {
  children: (ReactElement<TabItemProps> | null)[];
}

export default function Tabs({ children }: TabsProps) {
  const childrenWitnoutNull = children.filter((child) => child !== null);

  const [selected, setSelected] = useState(childrenWitnoutNull[0].props.title);

  const selectedItem = childrenWitnoutNull.find(
    (child) => child.props.title === selected
  );

  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-between">
        <FadeIn delay={0} className="flex gap-8">
          {childrenWitnoutNull.map((child) => (
            <button
              key={`tab_${child.props.title}`}
              className={cn(
                "flex flex-col gap-1 transition-opacity",
                selected === child.props.title ? "opacity-100" : "opacity-50"
              )}
              onClick={() => setSelected(child.props.title)}
            >
              <div className="text-lg font-semibold">{child.props.title}</div>
              {selected === child.props.title && (
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

        {selectedItem?.props.button && (
          <FadeIn delay={0.1}>{selectedItem.props.button}</FadeIn>
        )}
      </div>

      <div>{selectedItem?.props.children}</div>
    </div>
  );
}
