import { useState } from "react";
import RoundedButton from "../shared/RoundedButton";
import { downloadFile } from "@/utils/save-files";

interface Props {
  assetId: string;
  fileId: string;
  fileName: string;
}

export default function DownloadFileButton({
  assetId,
  fileId,
  fileName,
}: Props) {
  // loading state
  const [loading, setLoading] = useState(false);

  // handle download
  const handleDownload = async () => {
    setLoading(true);
    await downloadFile(assetId, fileId, fileName);
    setLoading(false);
  };

  return (
    <RoundedButton
      icon={loading ? "Spinner" : "DownloadSimple"}
      className={loading ? "animate-spin" : ""}
      colorType="secondary"
      onClick={handleDownload}
    />
  );
}
