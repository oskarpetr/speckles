"use client";

import FadeIn from "@/components/animation/FadeIn";
import Heading from "@/components/common/Heading";
import LoginForm from "@/components/forms/LoginForm";
import NotAuthLayout from "@/components/layout/NotAuthLayout";
import Link from "next/link";

export default function Loginpage() {
  return (
    <NotAuthLayout>
      <div className="h-7"></div>

      <FadeIn delay={0.4}>
        <Heading title="Login" animate={false} />
      </FadeIn>

      <FadeIn delay={0.5} className="flex flex-col gap-8 items-center">
        <LoginForm />

        <Link href="/register" className="flex gap-2">
          <div>Don't have an account?</div>
          <div className="text-green-primary font-bold underline">Register</div>
        </Link>
      </FadeIn>
    </NotAuthLayout>
  );
}
