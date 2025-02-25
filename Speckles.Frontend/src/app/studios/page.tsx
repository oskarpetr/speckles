"use client";

import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import AddStudioModal from "@/components/modals/AddStudioModal";
import Heading from "@/components/shared/Heading";
import MyStudios from "@/components/studios/MyStudios";
import { useState } from "react";

export default function StudiosPage() {
  // add studio modal
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <LayoutSection>
        <Heading
          title="My studios"
          button={{
            text: "Create studio",
            icon: { name: "Plus" },
            onClick: () => setOpen(true),
          }}
        />
        <AddStudioModal open={open} setOpen={setOpen} />
        <MyStudios />
      </LayoutSection>
    </Layout>
  );
}
