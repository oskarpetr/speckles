"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";
import { IUser } from "@/types/dtos/User.types";
import StudioList from "@/components/studios/StudioList";
import Section from "@/components/shared/Section";
import Avatar from "@/components/shared/Avatar";
import LayoutSection from "@/components/layout/LayoutSection";
import NoItemsYet from "@/components/shared/NoItemsYet";
import { useUserQuery } from "@/hooks/useApi";

export default function ProfilePage() {
  // username param
  const { username } = useParams();

  // fetch user
  const userQuery = useUserQuery(username as string);
  const user = userQuery.data?.data as IUser;

  return (
    <Layout>
      <LayoutSection>
        {userQuery.isSuccess && (
          <div className="flex flex-col gap-20">
            <div>
              <Heading title={user.username} />

              <Avatar user={user} size={120} />
            </div>

            <Section title="Studios" delay={0.1}>
              {user.studios.length > 0 ? (
                <StudioList studios={user.studios} delay={0.1} />
              ) : (
                <NoItemsYet items="studios" />
              )}
            </Section>

            <Section title="Following" delay={0.2}>
              {user.following.length > 0 ? (
                <StudioList studios={user.following} delay={0.2} />
              ) : (
                <NoItemsYet items="followings" />
              )}
            </Section>
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
