import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import EditAssetForm from "../forms/EditAssetForm";
import {
  useAssetQuery,
  useCurrenciesQuery,
  useLicensesQuery,
} from "@/hooks/useApi";
import { formatCurrencies, formatLicenses } from "@/utils/formatters";
import { IAsset } from "@/types/dtos/Asset.types";

interface Props {
  assetId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditAssetModal({ assetId, open, setOpen }: Props) {
  // asset query
  const assetQuery = useAssetQuery(assetId);
  const asset = assetQuery.data?.data as IAsset;

  // currencies & licenses queries
  const currenciesQuery = useCurrenciesQuery();
  const licensesQuery = useLicensesQuery();

  // currencies & licenses data
  const currencies = currenciesQuery.data?.data ?? [];
  const licenses = licensesQuery.data?.data ?? [];

  // format currencies & licenses
  const formattedCurrencies = formatCurrencies(currencies);
  const formattedLicenses = formatLicenses(licenses);

  // close modal on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Edit asset" open={open} setOpen={setOpen}>
      {assetQuery.isSuccess && (
        <EditAssetForm
          asset={asset}
          onSuccess={onSuccess}
          currencies={formattedCurrencies}
          licenses={formattedLicenses}
        />
      )}
    </Modal>
  );
}
