"use client";

import Heading from "@/components/common/Heading";
import HomeAssets from "@/components/home/HomeAssets";
import HomeStudios from "@/components/home/HomeStudios";
import Layout from "@/components/layout/Layout";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout>
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

      <HomeAssets />
      <HomeStudios />
    </Layout>
  );
}
