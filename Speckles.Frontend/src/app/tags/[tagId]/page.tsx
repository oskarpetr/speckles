"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { ITag } from "@/types/dtos/Tag.types";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import LayoutSection from "@/components/layout/LayoutSection";
import { useTagQuery } from "@/hooks/useApi";
import LoadMore from "@/components/shared/LoadMore";
import AssetList from "@/components/asset/AssetList";

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
              <AssetList assets={tag.assets} />
            </LoadMore>
          </Fragment>
        )}
      </LayoutSection>
    </Layout>
  );
}
