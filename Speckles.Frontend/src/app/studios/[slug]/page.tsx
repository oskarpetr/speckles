"use client";

import Layout from "@/components/layout/Layout";
import StudioBanner from "@/components/studios/StudioBanner";
import { IStudio } from "@/types/dtos/Studio.types";
import { useParams } from "next/navigation";
import StudioTabs from "@/components/studios/StudioTabs";
import LayoutSection from "@/components/layout/LayoutSection";
import { useStudioQuery } from "@/hooks/useApi";

export default function StudioPage() {
  // slug param
  const { slug } = useParams();

  // fetch studio
  const studioQuery = useStudioQuery(slug as string);
  const studio = studioQuery.data?.data as IStudio;

  return (
    <Layout>
      <LayoutSection padding={false}>
        {studioQuery.isSuccess && <StudioBanner studio={studio} />}
      </LayoutSection>

      <LayoutSection>
        {studioQuery.isSuccess && <StudioTabs studio={studio} />}
      </LayoutSection>
    </Layout>
  );
}
