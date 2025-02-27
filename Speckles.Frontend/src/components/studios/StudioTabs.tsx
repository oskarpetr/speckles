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
import AddAssetModal from "../modals/AddAssetModal";
import { useState } from "react";
import EditAboutStudioModal from "../modals/EditAboutStudioModal";
import AddMemberModal from "../modals/AddMemberModal";
import StudioProjects from "./StudioProjects";

interface Props {
  studio: IStudio;
}

export default function StudioTabs({ studio }: Props) {
  // session
  const { data: session } = useSession();

  // permission
  const canEdit = canEditStudio(studio, session?.user.userId ?? "");

  // add asset modal
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);

  // add project modal
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);

  // add member modal
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  // edit about modal
  const [openEditStudioModal, setOpenEditStudioModal] = useState(false);

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
              onClick={() => setOpenAddAssetModal(true)}
            />
          ) : null
        }
      >
        <StudioAssets assets={studio?.assets} canEdit={canEdit} />
        <AddAssetModal
          open={openAddAssetModal}
          setOpen={setOpenAddAssetModal}
        />
      </TabItem>

      <TabItem
        title="Projects"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Plus" }}
              text="Add project"
              size="small"
              onClick={() => setOpenAddProjectModal(true)}
            />
          ) : null
        }
      >
        <StudioProjects projects={studio?.projects} />
        {/* <EditAboutStudioModal
          about={studio.about}
          contactEmail={studio.contactEmail}
          open={openEditStudioModal}
          setOpen={setOpenEditStudioModal}
        /> */}
      </TabItem>

      <TabItem
        title="Members"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Plus" }}
              text="Add member"
              size="small"
              onClick={() => setOpenAddMemberModal(true)}
            />
          ) : null
        }
      >
        <StudioMembers slug={studio?.slug} members={studio?.members} />
        <AddMemberModal
          open={openAddMemberModal}
          setOpen={setOpenAddMemberModal}
        />
      </TabItem>

      <TabItem
        title="About"
        button={
          canEdit ? (
            <Button
              icon={{ name: "Pencil" }}
              text="Edit about"
              size="small"
              onClick={() => setOpenEditStudioModal(true)}
            />
          ) : null
        }
      >
        <StudioAbout studio={studio} />
        <EditAboutStudioModal
          about={studio.about}
          contactEmail={studio.contactEmail}
          open={openEditStudioModal}
          setOpen={setOpenEditStudioModal}
        />
      </TabItem>
    </Tabs>
  );
}
