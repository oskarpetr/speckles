import Image from "next/image";
import FadeIn from "../animation/FadeIn";
import Logo from "./Logo";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NotAuthLayout({ children }: Props) {
  return (
    <div className="flex w-screen">
      <div className="flex flex-col justify-between bg-green-primary w-1/3 h-screen fixed px-32 py-20 ">
        <div className="flex flex-col gap-24">
          <FadeIn>
            <Logo />
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-4">
            <div className="heading text-4xl text-white">Creativity,</div>
            <div className="heading text-4xl text-white">Inspiration,</div>
            <div className="heading text-4xl text-white">Artistry.</div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <Image
            src={"/images/Illustration.png"}
            alt="Illustration"
            width={400}
            height={400}
            className="w-full"
          />
        </FadeIn>
      </div>

      <div className="w-full ml-[calc(100%*1/3)] px-32 py-20">
        <div className="w-[30rem] flex flex-col gap-24">{children}</div>
      </div>
    </div>
  );
}
