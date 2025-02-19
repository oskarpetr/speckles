import { formatDate, formatPrice } from "@/utils/formatters";
import { IOrder } from "@/types/dtos/Order.types";
import Button from "../shared/Button";

interface Props {
  order: IOrder;
}

export default function OrderSummary({ order }: Props) {
  return (
    <div className="flex flex-col gap-6 bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div>Order date</div>
          <div>{formatDate(order.date)}</div>
        </div>

        <div className="flex justify-between">
          <div>Amount paid</div>
          <div>
            {formatPrice(
              order.asset.currency.locale,
              order.asset.currency.name,
              order.asset.price
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div>Payment method</div>
          <div>{order.paymentMethod}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8">
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
    </div>
  );
}
