import Link from "next/link";
import Section from "../common/Section";

export default function Footer() {
  return (
    <footer className="bg-black-primary flex flex-col gap-16 px-32 py-24">
      <div className="flex gap-32">
        <div className="w-full flex flex-col gap-2">
          <Section title="Store" color="white" />
          <Link href="/" className="text-white opacity-80">
            Home page
          </Link>
          <Link href="/" className="text-white opacity-80">
            Search Assets
          </Link>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Creators" color="white" />
          <Link href="/" className="text-white opacity-80">
            Become a Creator
          </Link>
          <Link href="/" className="text-white opacity-80">
            Earning program
          </Link>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Customers" color="white" />
          <Link href="/" className="text-white opacity-80">
            Help Centre
          </Link>
          <Link href="/" className="text-white opacity-80">
            Licensing
          </Link>
          <Link href="/" className="text-white opacity-80">
            Refunds
          </Link>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Section title="Legal" color="white" />
          <Link href="/" className="text-white opacity-80">
            Terms and Conditions
          </Link>
          <Link href="/" className="text-white opacity-80">
            Privacy Policy
          </Link>
          <Link href="/" className="text-white opacity-80">
            Copyright
          </Link>
        </div>
      </div>

      <div className="text-white opacity-50">&copy; 2024 Speckles</div>
    </footer>
  );
}
