import Button from "../shared/Button";
import { IOrder } from "@/types/dtos/Order.types";
import { useState } from "react";
import { downloadAllFiles } from "@/utils/save-files";

interface Props {
  order: IOrder;
}

export default function DownloadAllButton({ order }: Props) {
  // loading state
  const [loading, setLoading] = useState(false);

  // handle download
  const handleDownload = async () => {
    setLoading(true);
    await downloadAllFiles(order);
    setLoading(false);
  };

  return (
    <Button
      text="Download All"
      icon={{ name: "DownloadSimple" }}
      onClick={handleDownload}
      loading={loading}
      fullWidth
    />
  );
}
