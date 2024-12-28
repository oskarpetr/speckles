"use client";

import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import Heading from "@/components/shared/Heading";
import MyStudios from "@/components/studios/MyStudios";

export default function StudiosPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading title="My studios" />
        <MyStudios />
      </LayoutSection>
    </Layout>
  );
}
