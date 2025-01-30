import { useSearchQuery } from "@/hooks/useApi";
import AssetList from "../asset/AssetList";

interface Props {
  search: string;
}

export default function SearchAssets({ search }: Props) {
  // fetch search
  const searchQuery = useSearchQuery(search);
  const assets = searchQuery.data?.data ?? [];

  return <AssetList assets={assets} />;
}
