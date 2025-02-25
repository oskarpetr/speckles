import { getStudioLogoAlt } from "@/utils/alts";
import { getStudioLogo } from "@/utils/images";
import Image from "next/image";
import Heading from "../shared/Heading";
import { IStudio } from "@/types/dtos/Studio.types";
import FadeIn from "../animation/FadeIn";
import Button from "../shared/Button";
import { Fragment, useState } from "react";
import { toastSuccess } from "../shared/Toast";
import Like from "../shared/Like";
import { canEditStudio } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { cn } from "@/utils/cn";
import { layoutSectionPadding } from "../layout/LayoutSection";
import EditStudioModal from "../modals/EditStudioModal";
import DeleteModal from "../modals/DeleteModal";
import { deleteStudio } from "@/utils/firebase/firebase-fns";
import { useRouter } from "next/navigation";
import { useStudioDelete } from "@/hooks/useApi";

interface Props {
  studio: IStudio;
}

export default function StudioBanner({ studio }: Props) {
  // router
  const router = useRouter();

  // session
  const { data: session } = useSession();

  // followed state
  const [followed, setFollowed] = useState(false);

  // settings modal
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  // delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // avatar change date
  const [avatarChangeDate, setAvatarChangeDate] = useState(new Date());

  // studio delete
  const studioDelete = useStudioDelete(studio.slug);

  // permission
  const canEdit = canEditStudio(studio, session?.user.userId ?? "");

  // toggle follow
  function toggleFollow() {
    setFollowed(!followed);

    toastSuccess(
      followed ? `You unfollowed ${studio.name}` : `You followed ${studio.name}`
    );
  }

  // on delete handler
  const onDelete = async () => {
    await studioDelete.mutateAsync();
    await deleteStudio(
      studio.studioId,
      studio.assets.map((asset) => asset.assetId)
    );

    router.push("/studios");
  };

  return (
    <div className="relative">
      <div className="h-64 overflow-hidden relative">
        <Image
          src={getStudioLogo(studio.studioId, avatarChangeDate)}
          alt={getStudioLogoAlt(studio.name)}
          width={300}
          height={300}
          className="w-full h-64 object-cover object-center blur-md scale-[2]"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black-primary bg-opacity-40"></div>
        <div className="h-full flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]"></div>
      </div>

      <div
        className={cn(
          "absolute top-0 flex justify-between items-center gap-6 w-full h-fit",
          layoutSectionPadding
        )}
      >
        <div className="flex items-center gap-8">
          <FadeIn className="relative">
            <Image
              src={getStudioLogo(studio.studioId, avatarChangeDate)}
              alt={getStudioLogoAlt(studio.name)}
              width={150}
              height={150}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div className="absolute -top-2 -right-3">
              <Button
                type="white"
                size="small"
                circle={true}
                onClick={toggleFollow}
              >
                <Like
                  liked={followed}
                  setLiked={setFollowed}
                  iconSize="small"
                  color="black"
                />
              </Button>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-1">
            <Heading title={studio.name} color="white" />
            <FadeIn className="text-white text-opacity-60 font-semibold">
              {studio.address.country}
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.1}>
          {canEdit && (
            <div className="flex gap-4">
              <Button
                icon={{ name: "Trash" }}
                text="Delete"
                type="white"
                size="small"
                onClick={() => setOpenDeleteModal(true)}
              />

              <Button
                icon={{ name: "GearSix" }}
                text="Settings"
                type="white"
                size="small"
                onClick={() => setOpenSettingsModal(true)}
              />
            </div>
          )}

          <EditStudioModal
            studio={studio}
            open={openSettingsModal}
            setOpen={setOpenSettingsModal}
            setAvatarChangeDate={setAvatarChangeDate}
          />

          <DeleteModal
            name={studio.name}
            phrase="Delete studio"
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            onDelete={onDelete}
          />
          {/* <div className="text-white">{studio.contactEmail}</div> */}
          {/* <div className="flex items-center gap-2">
            <Icon name="Basket" color="white" className="opacity-50" />
            <div className="text-white font-semibold text-lg">13 249 Sales</div>
          </div> */}
        </FadeIn>
      </div>
    </div>
  );
}
