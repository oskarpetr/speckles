import { useSavedMutation } from "@/hooks/useApi";
import { IAsset } from "@/types/dtos/Asset.types";
import { existsInLocalSaved, localSavedToggle } from "@/utils/local";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Like from "../shared/Like";

interface Props {
  asset: IAsset;
}

export default function AddToSaved({ asset }: Props) {
  // session
  const { status } = useSession();

  // determine if asset is saved
  const determineSaved = () => {
    if (status === "authenticated") {
      return asset.saved;
    } else {
      return existsInLocalSaved(asset.assetId);
    }
  };

  // saved asset state
  const [savedAsset, setSavedAsset] = useState(determineSaved);

  // post saved
  const savedMutation = useSavedMutation(asset.assetId, savedAsset);

  // toggle save asset
  const toggleSaveAsset = () => {
    if (status === "authenticated") {
      savedMutation.mutate();
    } else {
      localSavedToggle(asset.assetId, savedAsset);
    }
  };

  return (
    <button
      onClick={toggleSaveAsset}
      className="absolute top-8 right-8 drop-shadow-2xl p-3 rounded-full bg-black bg-opacity-40 backdrop-blur-md"
    >
      <Like
        liked={savedAsset}
        setLiked={setSavedAsset}
        iconSize="big"
        color="white"
      />
    </button>
  );
}
