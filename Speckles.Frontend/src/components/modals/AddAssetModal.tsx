import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddAssetForm from "../forms/AddAssetForm";
import { useCurrenciesQuery, useLicensesQuery } from "@/hooks/useApi";
import { formatCurrencies, formatLicenses } from "@/utils/formatters";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddAssetModal({ open, setOpen }: Props) {
  // currencies & licenses queries
  const currenciesQuery = useCurrenciesQuery();
  const licensesQuery = useLicensesQuery();

  // currencies & licenses data
  const currencies = currenciesQuery.data?.data ?? [];
  const licenses = licensesQuery.data?.data ?? [];

  // format currencies & licenses
  const formattedCurrencies = formatCurrencies(currencies);
  const formattedLicenses = formatLicenses(licenses);

  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add asset" open={open} setOpen={setOpen}>
      <AddAssetForm
        currencies={formattedCurrencies}
        licenses={formattedLicenses}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
