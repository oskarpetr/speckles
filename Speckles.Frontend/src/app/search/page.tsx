"use client";

import AssetList from "@/components/asset/AssetList";
import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import SearchAssets from "@/components/search/SearchAssets";
import SearchPrompts from "@/components/search/SearchPrompts";
import Description from "@/components/shared/Description";
import Grid from "@/components/shared/Grid";
import Heading from "@/components/shared/Heading";
import { useState } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Explore" />

        <div className="flex flex-col gap-6">
          <Description text="Search for assets you are looking for" />
          <SearchPrompts search={search} setSearch={setSearch} />
          <SearchAssets search={search} />
        </div>
      </LayoutSection>
    </Layout>
  );
}
