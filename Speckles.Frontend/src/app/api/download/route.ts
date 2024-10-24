import { getAssetFile } from "@/utils/images";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("assetId") || "";
  const fileName = searchParams.get("fileName") || "";

  console.log(getAssetFile(assetId, fileName));
  return redirect(getAssetFile(assetId, fileName));
}
