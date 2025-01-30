"use client";

import FadeIn from "@/components/animation/FadeIn";
import Asset from "@/components/asset/AssetItem";
import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { ITag } from "@/types/dtos/Tag.types";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import LayoutSection from "@/components/layout/LayoutSection";
import { useTagQuery } from "@/hooks/useApi";
import Grid from "@/components/shared/Grid";
import LoadMore from "@/components/shared/LoadMore";

export default function TagPage() {
  // tag id param
  const { tagId } = useParams();

  // page
  const [page, setPage] = useState(1);

  // fetch tag
  const tagQuery = useTagQuery(tagId as string, page);
  const tag = tagQuery.data?.data as ITag;
  const totalCount = tagQuery.data?.totalCount ?? 0;

  return (
    <Layout>
      <LayoutSection>
        {tagQuery.isSuccess && (
          <Fragment>
            <Heading title={tag.name} />

            <LoadMore
              page={page}
              setPage={setPage}
              totalCount={totalCount}
              query={tagQuery}
            >
              <Grid>
                {tag.assets.map((asset, index) => (
                  <FadeIn
                    key={`asset_${asset.assetId}`}
                    delay={0.2 + index * 0.05}
                    className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
                  >
                    <Asset asset={asset} />
                  </FadeIn>
                ))}
              </Grid>
            </LoadMore>
          </Fragment>
        )}
      </LayoutSection>
    </Layout>
  );
}
