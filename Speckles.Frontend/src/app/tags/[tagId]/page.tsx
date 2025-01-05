"use client";

import FadeIn from "@/components/animation/FadeIn";
import Asset from "@/components/asset/AssetItem";
import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { ITag } from "@/types/dtos/Tag.types";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import LayoutSection from "@/components/layout/LayoutSection";
import { useTagQuery } from "@/hooks/useApi";

export default function TagPage() {
  // tag id param
  const { tagId } = useParams();

  // fetch tag
  const tagQuery = useTagQuery(tagId as string);
  const tag = tagQuery.data?.data as ITag;

  return (
    <Layout>
      <LayoutSection>
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
      </LayoutSection>
    </Layout>
  );
}
