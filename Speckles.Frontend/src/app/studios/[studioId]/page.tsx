"use client";

import Layout from "@/components/layout/Layout";
import StudioBanner from "@/components/studios/StudioBanner";
import { IStudio } from "@/types/Studio.types";
import { fetchStudio } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import StudioTabs from "@/components/tabs/StudioTabs";

export default function StudioPage() {
  // studioId param
  const { studioId } = useParams();

  // studio query
  const studioQuery = useQuery({
    queryKey: ["studios", studioId],
    queryFn: () => fetchStudio(studioId.toString()),
  });

  // studio
  const studio = studioQuery.data?.data as IStudio;

  return (
    <Layout
      belowMenu={studioQuery.isSuccess && <StudioBanner studio={studio} />}
    >
      {studioQuery.isSuccess && <StudioTabs studio={studio} />}
    </Layout>
  );
}
