"use client";

import Heading from "@/components/shared/Heading";
import TrendingAssets from "@/components/home/TrendingAssets";
import TrendingStudios from "@/components/home/TrendingStudios";
import Layout from "@/components/layout/Layout";
import ForYou from "@/components/home/ForYou";
import AboutSpeckles from "@/components/home/AboutSpeckles";
import LayoutSection from "@/components/layout/LayoutSection";
import CurrencyDialog from "@/components/modals/CurrencyModal";

export default function HomePage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading
          title="Place for studios"
          subtitle="This space is for graphic studios and freelance creators to share their talents, explore inspiring digital assets and connect with fellow creators."
        />
        <TrendingAssets />
        <ForYou />
        <TrendingStudios />
      </LayoutSection>

      <LayoutSection padding={false}>
        <AboutSpeckles />
      </LayoutSection>

      <CurrencyDialog />
    </Layout>
  );
}
