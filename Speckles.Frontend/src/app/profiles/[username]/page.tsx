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
import Button from "@/components/shared/Button";
import { useSession } from "next-auth/react";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { useState } from "react";

export default function ProfilePage() {
  // session
  const { data: session } = useSession();

  // username param
  const { username } = useParams();

  // fetch user
  const userQuery = useUserQuery(username as string);
  const user = userQuery.data?.data as IUser;

  // edit profile modal
  const [open, setOpen] = useState(false);

  // check if user is owner
  const isOwner = session?.user?.username === user?.username;

  const [avatarChangeDate, setAvatarChangeDate] = useState(new Date());

  return (
    <Layout>
      <LayoutSection>
        {userQuery.isSuccess && (
          <div className="flex flex-col gap-20">
            <div className="flex justify-between">
              <div className="flex items-center gap-8">
                <Avatar user={user} size={120} changeDate={avatarChangeDate} />

                <div>
                  <Heading title={user.fullName} />
                  <div className="opacity-80">@{user.username}</div>
                </div>
              </div>

              {isOwner && (
                <Button
                  text="Edit profile"
                  size="small"
                  onClick={() => setOpen(true)}
                />
              )}

              <EditProfileModal
                user={user}
                open={open}
                setOpen={setOpen}
                setAvatarChangeDate={setAvatarChangeDate}
              />
            </div>

            <table>
              <tbody>
                <tr>
                  <td className="font-bold w-24">Email</td>
                  <td className="opacity-80">{user.email}</td>
                </tr>
                <tr>
                  <td className="font-bold w-24">Country</td>
                  <td className="opacity-80">{user.address.country}</td>
                </tr>
              </tbody>
            </table>

            <Section title="Studios" delay={0.2}>
              {user.studios.length > 0 ? (
                <StudioList studios={user.studios} delay={0.2} />
              ) : (
                <NoItemsYet items="studios" />
              )}
            </Section>

            <Section title="Following" delay={0.3}>
              {user.following.length > 0 ? (
                <StudioList studios={user.following} delay={0.3} />
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
