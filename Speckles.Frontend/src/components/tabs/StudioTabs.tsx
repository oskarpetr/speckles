import { sortAssetsByTag } from "@/utils/sort";
import Tabs from "../common/Tabs";
import { IStudio } from "@/types/Studio.types";
import { ITabItem } from "@/types/TabItem.types";
import StudioAssets from "../studios/StudioAssets";
import StudioMembers from "../studios/StudioMembers";
import StudioAbout from "../studios/StudioAbout";
import StudioAnalytics from "../studios/StudioAnalytics";
import { useSession } from "next-auth/react";

interface Props {
  studio: IStudio;
}

export default function StudioTabs({ studio }: Props) {
  // session
  const { data: session } = useSession();

  // sort assets by tag
  const parsedAssets = sortAssetsByTag(studio?.assets ?? []);

  // permission
  const canEdit = studio?.members.some(
    (x) => x.memberId === session?.user.memberId
  );

  // tab items
  const tabItems: ITabItem[] = [
    {
      title: "Assets",
      content: <StudioAssets assets={studio?.assets} tags={parsedAssets} />,
    },
    {
      title: "Members",
      content: <StudioMembers members={studio?.members} />,
    },
    {
      title: "About",
      content: <StudioAbout portfolio={studio?.portfolio} />,
    },
  ];

  if (canEdit)
    tabItems.unshift({
      title: "Analytics",
      content: <StudioAnalytics slug={studio.slug} />,
    });

  return <Tabs items={tabItems} />;
}
