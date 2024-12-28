"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import Saved from "@/components/saved/Saved";
import LayoutSection from "@/components/layout/LayoutSection";

export default function SavedPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading title="Saved assets" />
        <Saved />
      </LayoutSection>
    </Layout>
  );
}
