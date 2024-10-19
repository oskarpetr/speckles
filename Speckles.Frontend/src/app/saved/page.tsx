"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import Saved from "@/components/saved/Saved";

export default function SavedPage() {
  return (
    <Layout>
      <Heading title="Saved assets" />
      <Saved />
    </Layout>
  );
}
