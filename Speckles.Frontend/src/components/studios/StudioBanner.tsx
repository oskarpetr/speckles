import { getStudioLogoAlt } from "@/utils/alts";
import { getStudioLogo } from "@/utils/images";
import Image from "next/image";
import Heading from "../shared/Heading";
import { IStudio } from "@/types/Studio.types";
import FadeIn from "../animation/FadeIn";
import Button from "../shared/Button";
import { useState } from "react";
import { toastSuccess } from "../shared/Toast";
import Like from "../shared/Like";
import { canEditStudio } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { cn } from "@/utils/cn";
import { layoutSectionPadding } from "../layout/LayoutSection";

interface Props {
  studio: IStudio;
}

export default function StudioBanner({ studio }: Props) {
  // session
  const { data: session } = useSession();

  const [followed, setFollowed] = useState(false);

  // permission
  const canEdit = canEditStudio(studio, session?.user.memberId ?? "");

  function toggleFollow() {
    setFollowed(!followed);

    toastSuccess(
      followed
        ? `You unfollowed ${studio.name}.`
        : `You followed ${studio.name}.`
    );
  }

  return (
    <div className="relative">
      <div className="h-64 overflow-hidden relative">
        <Image
          src={getStudioLogo(studio.studioId)}
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
              src={getStudioLogo(studio.studioId)}
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
            <Button
              icon={{ name: "GearSix" }}
              text="Settings"
              type="white"
              size="small"
            />
          )}
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
