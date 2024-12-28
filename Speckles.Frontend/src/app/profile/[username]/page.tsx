"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/utils/fetchers";
import { IUser } from "@/types/dtos/User.types";
import StudiosList from "@/components/studios/StudioList";
import Section from "@/components/shared/Section";
import Avatar from "@/components/shared/Avatar";
import LayoutSection from "@/components/layout/LayoutSection";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function ProfilePage() {
  // username param
  const { username } = useParams();

  const userQuery = useQuery<ApiResponse<IUser>>({
    queryKey: ["users", username],
    queryFn: () => fetchUser(username as string),
  });

  const user = userQuery.data?.data as IUser;

  return (
    <Layout>
      <LayoutSection>
        {userQuery.isSuccess && (
          <div className="flex flex-col gap-20">
            <div>
              <Heading title={user.username} />

              <Avatar
                fullName={user.fullName}
                userId={user.userId}
                size={120}
              />
            </div>

            <Section title="Studios" delay={0.1}>
              {user.studios.length > 0 ? (
                <StudiosList studios={user.studios} delay={0.1} />
              ) : (
                <div className="text-neutral-500">No studios yet</div>
              )}
            </Section>

            <Section title="Following" delay={0.2}>
              {user.following.length > 0 ? (
                <StudiosList studios={user.following} delay={0.2} />
              ) : (
                <div className="text-neutral-500">No followings yet</div>
              )}
            </Section>
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
