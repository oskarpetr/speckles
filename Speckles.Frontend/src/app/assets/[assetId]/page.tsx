"use client";

import Layout from "@/components/layout/Layout";
import { IAsset } from "@/types/dtos/Asset.types";
import { useParams } from "next/navigation";
import AssetDetail from "@/components/asset/AssetDetail";
import AssetTabs from "@/components/asset/AssetTabs";
import LayoutSection from "@/components/layout/LayoutSection";
import { useAssetQuery } from "@/hooks/useApi";
import { useEffect } from "react";

export default function AssetPage() {
  // asset id param
  const { assetId } = useParams();

  // fetch asset
  const assetQuery = useAssetQuery(assetId as string);
  const asset = assetQuery.data?.data as IAsset;

  useEffect(() => {
    console.log(asset);
  }, [asset]);

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
