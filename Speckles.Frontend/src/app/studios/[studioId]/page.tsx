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

  const { data, error, isSuccess } = useQuery({
    queryKey: ["studios", studioId],
    queryFn: () => fetchStudio(studioId.toString()),
  });

  const studio = data as IStudio;

  return (
    <Layout>
      {isSuccess && (
        <Fragment>
          {/* <Image
              src={getStudioLogo(studio.studioId)}
              alt={`${studio.name}'s Logo`}
              width={300}
              height={300}
              className="w-full h-48 object-cover object-center"
            /> */}

          <Heading title={studio.name} />

          <StudioAssets assets={studio.assets} />
          <StudioMembers members={studio.members} />
        </Fragment>
      )}
    </Layout>
  );
}
