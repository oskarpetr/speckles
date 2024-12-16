import { useQuery } from "@tanstack/react-query";
import Icon from "../shared/Icon";
import { fetchPromotion } from "@/utils/fetchers";
import { IPromotion } from "@/types/Promotion.types";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function Promotion() {
  const [visible, setVisible] = useState(true);

  const promotionQuery = useQuery({
    queryKey: ["promotion"],
    queryFn: fetchPromotion,
  });

  const promotion = (promotionQuery.data?.data as IPromotion) ?? null;

  return (
    promotion !== null && (
      <div
        className={cn(
          "flex justify-between items-center gap-12 bg-black-primary px-16 lg:px-32 py-3 transition-transform",
          visible ? "translate-y-0" : "-translate-y-12 absolute"
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
