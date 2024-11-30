import { getStudioLogoAlt } from "@/utils/alts";
import { getStudioLogo } from "@/utils/images";
import Image from "next/image";
import Heading from "../common/Heading";
import { IStudio } from "@/types/Studio.types";
import FadeIn from "../animation/FadeIn";
import Icon from "../common/Icon";

interface Props {
  studio: IStudio;
}

export default function StudioBanner({ studio }: Props) {
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

      <div className="absolute bottom-12 left-32 flex justify-between items-end gap-6 w-[calc(100%-16rem)]">
        <div className="flex items-center gap-6">
          <FadeIn>
            <Image
              src={getStudioLogo(studio.studioId)}
              alt={getStudioLogoAlt(studio.name)}
              width={100}
              height={100}
              className="w-20 h-20 rounded-full object-cover"
            />
          </FadeIn>
          <div className="flex flex-col gap-1">
            <Heading title={studio.name} color="white" />
            <FadeIn className="text-white text-opacity-60 font-semibold">
              {studio.address.country}
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.1}>
          {/* <div className="text-white">{studio.contactEmail}</div> */}
          <div className="flex items-center gap-2">
            <Icon name="Basket" color="white" className="opacity-50" />
            <div className="text-white font-semibold text-lg">13 249 Sales</div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
