"use client";

import FadeIn from "@/components/animation/FadeIn";
import { IStudioShort } from "@/types/dtos/Studio.types";
import { fetchStudios } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import StudioList from "./StudioList";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function MyStudios() {
  // session
  const { data: session } = useSession();

  const studiosQuery = useQuery<ApiResponse<IStudioShort[]>>({
    queryKey: ["studios", "userId", session?.user.userId],
    queryFn: () => fetchStudios(session?.user.userId ?? ""),
    enabled: !!session,
  });

  const studios = studiosQuery.data?.data ?? [];

  return (
    <FadeIn delay={0.1}>
      {studiosQuery.isSuccess && <StudioList studios={studios} delay={0.1} />}
    </FadeIn>
  );
}
