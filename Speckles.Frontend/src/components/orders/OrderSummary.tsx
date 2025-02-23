import { formatDate, formatPrice } from "@/utils/formatters";
import { IOrder } from "@/types/dtos/Order.types";
import Button from "../shared/Button";
import { GrayCardItem } from "../shared/GrayCardItem";
import GrayCard from "../shared/GrayCard";

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
        <Button
          text="View Invoice"
          icon={{ name: "FileText" }}
          type="secondary"
          fullWidth
        />
        <Button
          text="Download All"
          icon={{ name: "DownloadSimple" }}
          fullWidth
        />
      </div>
    </GrayCard>
  );
}
