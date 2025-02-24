import { formatDate, formatPrice } from "@/utils/formatters";
import { IOrder } from "@/types/dtos/Order.types";
import Button from "../shared/Button";
import { GrayCardItem } from "../shared/GrayCardItem";
import GrayCard from "../shared/GrayCard";
import DownloadAllButton from "./DownloadAllButton";
import Link from "next/link";
import DownloadInvoiceButton from "./DownloadInvoiceButton";

interface Props {
  order: IOrder;
}

export default function OrderSummary({ order }: Props) {
  const orderDate = formatDate(order.date);
  const amountPaid = formatPrice(
    order.asset.currency.locale,
    order.asset.currency.name,
    order.asset.price
  );

  return (
    <GrayCard>
      <div className="flex flex-col gap-2">
        <GrayCardItem property="Order date" value={orderDate} />
        <GrayCardItem property="Amount paid" value={amountPaid} />
        <GrayCardItem property="Payment method" value={order.paymentMethod} />
      </div>

      <div className="flex flex-col gap-4">
        <DownloadInvoiceButton order={order} />
        <DownloadAllButton order={order} />
      </div>
    </GrayCard>
  );
}
