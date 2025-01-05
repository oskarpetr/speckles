import Icon from "../shared/Icon";
import { IPromotion } from "@/types/dtos/Promotion.types";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { layoutSectionPadding } from "./LayoutSection";
import { usePromotionQuery } from "@/hooks/useApi";

export default function Promotion() {
  const [visible, setVisible] = useState(true);

  // fetch promotion
  const promotionQuery = usePromotionQuery();
  const promotion = promotionQuery.data?.data as IPromotion;

  return (
    promotion && (
      <div
        className={cn(
          "flex justify-between items-center gap-12 bg-black-primary transition-transform",
          visible ? "translate-y-0" : "-translate-y-12 absolute",
          layoutSectionPadding,
          "py-3"
        )}
      >
        <div className="text-white text-sm font-semibold">
          {promotion.description}
        </div>

        <button onClick={() => setVisible(false)}>
          <Icon name="X" color="white" size={20} />
        </button>
      </div>
    )
  );
}
