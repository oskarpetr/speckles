"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";

export default function StudioPage() {
  const { studioId } = useParams();

  return (
    <Layout>
      <Heading title={studioId.toString()} />
    </Layout>
  );
}
