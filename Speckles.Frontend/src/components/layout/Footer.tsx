import Link from "next/link";
import Section from "../shared/Section";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { layoutSectionPadding } from "./LayoutSection";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div
        className={cn(
          "flex justify-between items-center gap-6 bg-neutral-800",
          layoutSectionPadding,
          "py-8"
        )}
      >
        <div className="text-white opacity-80">Payment options</div>

        <div className="flex gap-4">
          <div className="flex justify-center items-center bg-white bg-opacity-10 rounded-lg px-6 w-fit h-10">
            <Image
              src="/images/providers/paypal.svg"
              alt="PayPal"
              width={60}
              height={50}
            />
          </div>

          <div className="flex justify-center items-center bg-white bg-opacity-10 rounded-lg px-6 w-fit h-10">
            <Image
              src="/images/providers/stripe.svg"
              alt="Stripe"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>

      <div className="bg-black-primary flex flex-col gap-16 px-16 py-16 lg:px-32 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
          <Section title="Store" color="white">
            <div className="flex flex-col gap-2">
              <FooterItem text="Home Page" link="/" />
              <FooterItem text="Search Assets" link="/" />
            </div>
          </Section>

          <Section title="Creators" color="white">
            <div className="flex flex-col gap-2">
              <FooterItem text="Become a Creator" link="/" />
              <FooterItem text="Earning Program" link="/" />
              <FooterItem
                text="Develeoper API"
                link="http://localhost:8080/swagger"
              />
            </div>
          </Section>

          <Section title="Customers" color="white">
            <div className="flex flex-col gap-2">
              <FooterItem text="Help Centre" link="/" />
              <FooterItem text="Licensing" link="/" />
              <FooterItem text="Refunds" link="/" />
            </div>
          </Section>

          <Section title="Legal" color="white">
            <div className="flex flex-col gap-2">
              <FooterItem text="Terms and Conditions" link="/terms" />
              <FooterItem text="Privacy Policy" link="/privacy" />
              <FooterItem text="Copyright" link="/" />
            </div>
          </Section>
        </div>

        <div className="text-white opacity-50">
          Speckles {year} &copy; All rights reserved
        </div>
      </div>
    </footer>
  );
}

interface Props {
  link: string;
  text: string;
}

function FooterItem({ link, text }: Props) {
  return (
    <Link
      href={link}
      className="text-white opacity-80 hover:opacity-60 transition-opacity w-fit"
    >
      {text}
    </Link>
  );
}
