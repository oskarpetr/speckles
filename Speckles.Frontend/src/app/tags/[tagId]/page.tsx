"use client";

import FadeIn from "@/components/animation/FadeIn";
import Asset from "@/components/asset/Asset";
import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import { ITag } from "@/types/Tag.types";
import { fetchAssetsByTag } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function TagPage() {
  // tag id param
  const { tagId } = useParams();

  // fetch tag
  const tagQuery = useQuery({
    queryKey: ["tag", tagId],
    queryFn: () => fetchAssetsByTag(tagId.toString()),
  });

  // tag
  const tag = tagQuery.data?.data as ITag;

  return (
    <Layout>
      {tagQuery.isSuccess && (
        <Fragment>
          <Heading title={tag.name} />
          <div className="grid grid-cols-3 gap-6">
            {tagQuery.isSuccess &&
              tag.assets.map((asset, index) => (
                <FadeIn
                  key={`asset_${asset.assetId}`}
                  delay={0.2 + index * 0.05}
                  className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
                >
                  <Asset asset={asset} />
                </FadeIn>
              ))}
          </div>
        </Fragment>
      )}
    </Layout>
  );
}
