"use client";

import Heading from "@/components/common/Heading";
import Assets from "@/components/home/Assets";
import Studios from "@/components/home/Studios";
import Layout from "@/components/layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <Heading
        title="Place for studios"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum est vel justo posuere ullamcorper. Phasellus sed malesuada massa."
      />

      <Assets />
      <Studios />
    </Layout>
  );
}
