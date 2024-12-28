"use client";

import Layout from "@/components/layout/Layout";
import { IAsset } from "@/types/dtos/Asset.types";
import { fetchAsset } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { MenuContext } from "@/components/context/MenuContext";
import { useSession } from "next-auth/react";
import AssetDetail from "@/components/asset/AssetDetail";
import AssetTabs from "@/components/asset/AssetTabs";
import LayoutSection from "@/components/layout/LayoutSection";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function AssetPage() {
  // session
  const { data: session, status } = useSession();

  // asset id param
  const { assetId } = useParams();

  // menu context
  const menuContext = useContext(MenuContext);
  const { setAssetId } = menuContext;

  // fetch asset
  const assetQuery = useQuery<ApiResponse<IAsset>>({
    queryKey: ["asset", assetId],
    queryFn: () => fetchAsset(assetId as string, session?.user.memberId ?? ""),
    enabled:
      (status === "authenticated" && !!session) ||
      status === "unauthenticated" ||
      status === "loading",
  });

  // asset
  const asset = assetQuery.data?.data as IAsset;

  useEffect(() => {
    setAssetId(assetId as string);
  }, []);

  return (
    <Layout>
      <LayoutSection>
        {assetQuery.isSuccess && (
          <div className="flex flex-col gap-32">
            <AssetDetail asset={asset} />
            <AssetTabs asset={asset} />
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
