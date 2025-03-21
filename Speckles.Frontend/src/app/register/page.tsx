"use client";

import FadeIn from "@/components/animation/FadeIn";
import Button from "@/components/shared/Button";
import Heading from "@/components/shared/Heading";
import RegisterForm from "@/components/forms/RegisterForm";
import NotAuthLayout from "@/components/layout/NotAuthLayout";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <NotAuthLayout>
      <FadeIn delay={0.3}>
        <RegisterSteps step={step} />
      </FadeIn>

      <FadeIn delay={0.4}>
        <Heading title="Register" animate={false} />
      </FadeIn>

      <FadeIn delay={0.5} className="flex flex-col gap-8 items-center">
        <RegisterForm step={step} setStep={setStep} />

        <div className="flex gap-6 items-center w-full">
          <div className="h-[1px] bg-black-primary bg-opacity-20 w-full"></div>
          <div>or</div>
          <div className="h-[1px] bg-black-primary bg-opacity-20 w-full"></div>
        </div>

        <Button
          text="Continue with Google"
          image={"/images/providers/google.svg"}
          type="black"
          fullWidth
          onClick={() => signIn("google")}
        />

        <Link href="/login" className="flex gap-2">
          <div>Already have an account?</div>
          <div className="text-green-primary font-bold underline">Login</div>
        </Link>
      </FadeIn>
    </NotAuthLayout>
  );
}

function RegisterSteps({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4 h-7">
      <div
        className={cn(
          "bg-green-primary min-w-4 h-4 rounded-full transition-all",
          step === 1 ? "bg-opacity-100" : "bg-opacity-30"
        )}
      ></div>
      <div className="h-[1px] w-full bg-green-primary bg-opacity-30 rounded-full"></div>
      <div
        className={cn(
          "bg-green-primary min-w-4 h-4 rounded-full transition-all",
          step === 2 ? "bg-opacity-100" : "bg-opacity-30"
        )}
      ></div>
      <div className="h-[1px] w-full bg-green-primary bg-opacity-30 rounded-full"></div>
      <div
        className={cn(
          "bg-green-primary min-w-4 h-4 rounded-full transition-all",
          step === 3 ? "bg-opacity-100" : "bg-opacity-30"
        )}
      ></div>
    </div>
  );
}
