import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import Button from "@/components/shared/Button";
import Heading from "@/components/shared/Heading";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading
          title="Page not found"
          subtitle="Looks like something is broken."
        />

        <Link href="/">
          <Button text="Home page" type="cancel" size="small" />
        </Link>
      </LayoutSection>
    </Layout>
  );
}
