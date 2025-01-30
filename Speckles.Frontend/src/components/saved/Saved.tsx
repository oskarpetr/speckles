import FadeIn from "../animation/FadeIn";
import AssetList from "../asset/AssetList";
import NoItemsYet from "../shared/NoItemsYet";
import { useSavedQuery } from "@/hooks/useApi";

export default function Saved() {
  // fetch saved assets
  const savedQuery = useSavedQuery();
  const savedAssets = savedQuery.data?.data ?? [];

  return (
    <FadeIn delay={0.2}>
      {(savedQuery.isLoading ||
        savedQuery.isError ||
        savedAssets.length === 0) && <NoItemsYet items="saved assets" />}
      <AssetList
        assets={savedAssets}
        delay={0.2}
        skeleton={savedQuery.isLoading || savedQuery.isError}
      />
    </FadeIn>
  );
}
