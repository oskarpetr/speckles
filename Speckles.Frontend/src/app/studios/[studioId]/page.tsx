"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import StudioAssets from "@/components/studios/StudioAssets";
import StudioMembers from "@/components/studios/StudioMembers";
import { IStudio } from "@/types/Studio.types";
import { fetchStudio } from "@/utils/fetchers";
import { getStudioLogo } from "@/utils/images";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function StudioPage() {
  const { studioId } = useParams();

  const studiosQuery = useQuery({
    queryKey: ["studios", studioId],
    queryFn: () => fetchStudio(studioId.toString()),
  });

  const studio = studiosQuery.data.data as IStudio;

  return (
    <Layout>
      {studiosQuery.isSuccess && (
        <Fragment>
          <div className="relative -left-32 -top-20 w-screen">
            <div className="h-64 overflow-hidden relative">
              <Image
                src={getStudioLogo(studio.studioId)}
                alt={`${studio.name}'s Logo`}
                width={300}
                height={300}
                className="w-full h-64 object-cover object-center blur-md scale-[2.5]"
              />
              <div className="absolute top-0 left-0 h-full w-full bg-black-primary bg-opacity-40"></div>
              <div className="h-full flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]"></div>
            </div>

            <div className="absolute bottom-12 left-32 flex items-center gap-6">
              <Image
                src={getStudioLogo(studio.studioId)}
                alt={`${studio.name}'s Logo`}
                width={100}
                height={100}
                className="w-16 h-16 rounded-full object-cover"
              />
              <Heading title={studio.name} color="white" />
            </div>
          </div>

          <StudioAssets assets={studio.assets} />
          <StudioMembers members={studio.members} />
        </Fragment>
      )}
    </Layout>
  );
}
