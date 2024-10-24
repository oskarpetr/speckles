"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";

export default function TagPage() {
  const { tagId } = useParams();

  return (
    <Layout>
      <Heading title={tagId.toString()} />
    </Layout>
  );
}
