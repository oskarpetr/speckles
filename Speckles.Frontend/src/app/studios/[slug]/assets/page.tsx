"use client";

import AddAssetForm from "@/components/forms/AddAssetForm";
import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import Heading from "@/components/shared/Heading";

export default function AssetsPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading title="Add new asset" />
        <div className="w-[35rem]">
          <AddAssetForm />
        </div>
      </LayoutSection>
    </Layout>
  );
}
