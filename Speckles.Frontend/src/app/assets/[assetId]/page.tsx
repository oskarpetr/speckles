"use client";

import Layout from "@/components/layout/Layout";
import { IAsset } from "@/types/Asset.types";
import { fetchAsset } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { MenuContext } from "@/components/context/MenuContext";
import { useSession } from "next-auth/react";
import AssetTabs from "@/components/tabs/AssetTabs";
import AssetDetail from "@/components/asset/AssetDetail";

export default function AssetPage() {
  // session
  const { data: session } = useSession();

  // asset id param
  const { assetId } = useParams();

  // menu context
  const menuContext = useContext(MenuContext);
  const { setAssetId } = menuContext;

  // fetch asset
  const assetQuery = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => fetchAsset(assetId.toString(), session?.user.memberId!),
    enabled: !!session,
  });

  const asset = assetQuery.data?.data as IAsset;
  const canEdit = asset?.studio.members.some(
    (x) => x.memberId === session?.user.memberId
  );

  useEffect(() => {
    setAssetId(assetId.toString());
  }, []);

  return (
    <Layout>
      {assetQuery.isSuccess && (
        <div className="flex flex-col gap-32">
          <AssetDetail asset={asset} />
          <AssetTabs asset={asset} />
        </div>
      )}
    </Layout>
  );
}
