import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import { fetchSavedAssets } from "@/utils/fetchers";
import { IAssetShort } from "@/types/dtos/Asset.types";
import { useSession } from "next-auth/react";
import AssetList from "../asset/AssetList";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function Saved() {
  // session
  const { data: session } = useSession();

  // fetch saved assets
  const savedQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: ["saved", session?.user.userId],
    queryFn: () => fetchSavedAssets(session?.user.userId ?? ""),
    enabled: !!session,
  });

  // saved assets
  const savedAssets = savedQuery.data?.data ?? [];

  return (
    <FadeIn delay={0.2}>
      {savedQuery.isSuccess && <AssetList assets={savedAssets} delay={0.2} />}
    </FadeIn>
  );
}
