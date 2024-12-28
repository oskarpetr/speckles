"use client";

import Layout from "@/components/layout/Layout";
import StudioBanner from "@/components/studios/StudioBanner";
import { IStudio } from "@/types/dtos/Studio.types";
import { fetchStudio } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import StudioTabs from "@/components/studios/StudioTabs";
import LayoutSection from "@/components/layout/LayoutSection";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function StudioPage() {
  // slug param
  const { slug } = useParams();

  // studio query
  const studioQuery = useQuery<ApiResponse<IStudio>>({
    queryKey: ["studios", slug],
    queryFn: () => fetchStudio(slug as string),
  });

  // studio
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
