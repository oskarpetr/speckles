import { getAssetFile } from "@/utils/images";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("assetId") ?? "";
  const fileName = searchParams.get("fileName") ?? "";

  return redirect(getAssetFile(assetId, fileName));
}
