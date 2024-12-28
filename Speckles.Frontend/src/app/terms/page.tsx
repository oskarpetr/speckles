"use client";

import Layout from "@/components/layout/Layout";
import LayoutSection from "@/components/layout/LayoutSection";
import Heading from "@/components/shared/Heading";
import Section from "@/components/shared/Section";
import terms from "@/data/terms.json";
import { Terminal } from "@phosphor-icons/react";

export default function TermsPage() {
  return (
    <Layout>
      <LayoutSection>
        <Heading title="Terms and Conditions" />

        <div className="flex flex-col gap-12 max-w-[50%]">
          {terms.data.map((term, termIndex) => (
            <Section
              delay={0.1 + 0.05 * termIndex}
              key={`term_${Terminal}`}
              title={term.heading}
            >
              <div className="flex flex-col gap-2">
                {term.content.map((content, contentIndex) => (
                  <p
                    key={`term_${termIndex}_content_${contentIndex}`}
                    className="text-gray-500 leading-relaxed"
                  >
                    {content}
                  </p>
                ))}
              </div>
            </Section>
          ))}
        </div>
      </LayoutSection>
    </Layout>
  );
}
