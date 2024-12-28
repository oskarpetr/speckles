"use client";

import Heading from "@/components/shared/Heading";
import TrendingAssets from "@/components/home/TrendingAssets";
import TrendingStudios from "@/components/home/TrendingStudios";
import Layout from "@/components/layout/Layout";
import ForYou from "@/components/home/ForYou";
import AboutSpeckles from "@/components/home/AboutSpeckles";
import LayoutSection from "@/components/layout/LayoutSection";

export default function HomePage() {
  return (
    <Layout>
      <LayoutSection>
        {/* <div className="flex items-center justify-between"> */}
        <Heading
          title="Place for studios"
          subtitle="This space is for graphic studios and freelance creators to share their talents, explore inspiring digital assets and connect with fellow creators."
        />
        {/* <FadeIn delay={0.2}>
          <Image
            src={"/images/HomeIllustration.png"}
            alt="Illustration"
            width={180}
            height={180}
            className="w-full"
          />
        </FadeIn>
      </div> */}

        <TrendingAssets />
        <ForYou />
        <TrendingStudios />
      </LayoutSection>

      <LayoutSection padding={false}>
        <AboutSpeckles />
      </LayoutSection>
    </Layout>
  );
}
