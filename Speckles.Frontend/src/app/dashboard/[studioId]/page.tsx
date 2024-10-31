"use client";

import Earnings from "@/components/analytics/Earnings";
import Sales from "@/components/analytics/Sales";
import FadeIn from "@/components/animation/FadeIn";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Layout from "@/components/layout/Layout";
import { IStudio } from "@/types/Studio.types";
import { fetchStudio } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function MyStudioPage() {
  const { studioId } = useParams();

  const fetchStudioRequest = useQuery({
    queryKey: ["studios", studioId],
    queryFn: () => fetchStudio(studioId.toString()),
  });

  const studio = fetchStudioRequest.data.data as IStudio;

  return (
    <Layout>
      {fetchStudioRequest.isSuccess && (
        <Fragment>
          <Heading title={studio.name} />

          <FadeIn delay={0.1}>
            <Section title="Analytics" />

            <div className="flex gap-8">
              <Earnings studioId={studioId.toString()} />
              <Sales />
            </div>
          </FadeIn>
        </Fragment>
      )}
    </Layout>
  );
}
