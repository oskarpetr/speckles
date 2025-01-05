"use client";

import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import SearchPrompts from "@/components/search/SearchPrompts";
import Description from "@/components/shared/Description";
import Heading from "@/components/shared/Heading";
import { useState } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Explore" />

        <div className="flex flex-col gap-4">
          <Description text="Search for assets you are looking for" />
          <SearchPrompts search={search} setSearch={setSearch} />
        </div>
      </LayoutSection>
    </Layout>
  );
}
