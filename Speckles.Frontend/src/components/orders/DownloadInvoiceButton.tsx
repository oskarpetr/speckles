import html2pdf from "html2pdf.js";
import { Fragment, useRef } from "react";
import Invoice from "./Invoice";
import Button from "../shared/Button";
import { IOrder } from "@/types/dtos/Order.types";

interface Props {
  order: IOrder;
}

export default function DownloadInvoiceButton({ order }: Props) {
  // invoice ref
  const invoiceRef = useRef(null);

  // download invoice
  const downloadInvoice = async () => {
    var options = {
      margin: 0,
      filename: `Invoice for ${order.asset.name}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 10 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(invoiceRef.current).save();
  };

  return (
    <Fragment>
      <Button
        text="Download Invoice"
        icon={{ name: "FileText" }}
        type="secondary"
        onClick={downloadInvoice}
        fullWidth
      />
      <Invoice ref={invoiceRef} order={order} />
    </Fragment>
  );
}
