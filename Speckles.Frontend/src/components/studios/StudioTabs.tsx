import Tabs from "../shared/Tabs";
import { TabItem } from "../shared/TabItem";
import { IStudio } from "@/types/dtos/Studio.types";
import StudioAssets from "./StudioAssets";
import StudioMembers from "./StudioMembers";
import StudioAbout from "./StudioAbout";
import StudioAnalytics from "./StudioAnalytics";
import Button from "../shared/Button";
import { canEditStudio } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AddAssetModal from "../modals/AddAssetModal";
import { useState } from "react";
import EditAboutStudioModal from "../modals/EditAboutStudioModal";

interface Props {
  studio: IStudio;
}

export default function StudioTabs({ studio }: Props) {
  // session
  const { data: session } = useSession();

  // permission
  const canEdit = canEditStudio(studio, session?.user.userId ?? "");

  // add asset modal
  const [openAddModal, setOpenAddModal] = useState(false);

  // edit about modal
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <Tabs>
      {/* {canEdit ? (
        <TabItem title="Analytics">
          <StudioAnalytics slug={studio.slug} />
        </TabItem>
      ) : null} */}

      <TabItem
        title="Assets"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Plus" }}
              text="Add asset"
              size="small"
              onClick={() => setOpenAddModal(true)}
            />
          ) : null
        }
      >
        <StudioAssets assets={studio?.assets} />
        <AddAssetModal open={openAddModal} setOpen={setOpenAddModal} />
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
        <StudioMembers slug={studio?.slug} members={studio?.members} />
      </TabItem>

      <TabItem
        title="About"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Pencil" }}
              text="Edit about"
              size="small"
              onClick={() => setOpenEditModal(true)}
            />
          ) : null
        }
      >
        <StudioAbout studio={studio} />
        <EditAboutStudioModal open={openEditModal} setOpen={setOpenEditModal} />
      </TabItem>
    </Tabs>
  );
}
