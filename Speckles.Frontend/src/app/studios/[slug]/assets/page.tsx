"use client";

import AddAssetForm from "@/components/forms/AddAssetForm";
import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import Heading from "@/components/shared/Heading";
import { useCurrenciesQuery, useLicensesQuery } from "@/hooks/useApi";
import { formatCurrencies, formatLicenses } from "@/utils/formatters";

export default function AssetsPage() {
  const currenciesQuery = useCurrenciesQuery();
  const licensesQuery = useLicensesQuery();

  const currencies = currenciesQuery.data?.data ?? [];
  const licenses = licensesQuery.data?.data ?? [];

  const formattedCurrencies = formatCurrencies(currencies);
  const formattedLicenses = formatLicenses(licenses);

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Add new asset" />
        <div className="w-[35rem]">
          <AddAssetForm
            currencies={formattedCurrencies}
            licenses={formattedLicenses}
          />
        </div>
      </LayoutSection>
    </Layout>
  );
}
