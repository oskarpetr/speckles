import Tabs from "../shared/Tabs";
import { TabItem } from "../shared/TabItem";
import { IStudio } from "@/types/Studio.types";
import StudioAssets from "./StudioAssets";
import StudioMembers from "./StudioMembers";
import StudioAbout from "./StudioAbout";
import StudioAnalytics from "./StudioAnalytics";
import Button from "../shared/Button";
import { canEditStudio } from "@/utils/permissions";
import { useSession } from "next-auth/react";

interface Props {
  studio: IStudio;
}

export default function StudioTabs({ studio }: Props) {
  // session
  const { data: session } = useSession();

  // permission
  const canEdit = canEditStudio(studio, session?.user.memberId ?? "");

  return (
    <Tabs>
      {canEdit ? (
        <TabItem title="Analytics">
          <StudioAnalytics slug={studio.slug} />
        </TabItem>
      ) : null}

      <TabItem
        title="Assets"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Plus" }}
              text="Add asset"
              size="small"
              onClick={() => {}}
            />
          ) : null
        }
      >
        <StudioAssets assets={studio?.assets} />
      </TabItem>

      <TabItem
        title="Members"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Users" }}
              text="Manage members"
              size="small"
              onClick={() => console.log("Manage members clicked")}
            />
          ) : null
        }
      >
        <StudioMembers members={studio?.members} />
      </TabItem>

      <TabItem
        title="About"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Pencil" }}
              text="Edit about"
              size="small"
              onClick={() => console.log("Edit about clicked")}
            />
          ) : null
        }
      >
        <StudioAbout studio={studio} />
      </TabItem>
    </Tabs>
  );
}
