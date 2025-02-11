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
  const currenciesQuery = useCurrenciesQuery();
  const licensesQuery = useLicensesQuery();

  const currencies = currenciesQuery.data?.data ?? [];
  const licenses = licensesQuery.data?.data ?? [];

  const formattedCurrencies = formatCurrencies(currencies);
  const formattedLicenses = formatLicenses(licenses);

  return (
    <Modal title="Add asset" open={open} setOpen={setOpen}>
      <p className="leading-relaxed"></p>

      <AddAssetForm
        currencies={formattedCurrencies}
        licenses={formattedLicenses}
      />
    </Modal>
  );
}
