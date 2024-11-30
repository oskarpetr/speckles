import Link from "next/link";
import Section from "../common/Section";

export default function Footer() {
  return (
    <footer className="bg-black-primary flex flex-col gap-16 px-32 py-24">
      <div className="flex gap-32">
        <div className="w-full flex flex-col gap-2">
          <Section title="Store" color="white" />

          <FooterItem text="Home Page" link="/" />
          <FooterItem text="Search Assets" link="/" />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Creators" color="white" />

          <FooterItem text="Become a Creator" link="/" />
          <FooterItem text="Earning Program" link="/" />
          <FooterItem
            text="Develeoper API"
            link="http://localhost:8080/swagger"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Customers" color="white" />

          <FooterItem text="Help Centre" link="/" />
          <FooterItem text="Licensing" link="/" />
          <FooterItem text="Refunds" link="/" />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Legal" color="white" />

          <FooterItem text="Terms and Conditions" link="/" />
          <FooterItem text="Privacy Policy" link="/" />
          <FooterItem text="Copyright" link="/" />
        </div>
      </div>

      <div className="text-white opacity-50">&copy; 2024 Speckles</div>
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
