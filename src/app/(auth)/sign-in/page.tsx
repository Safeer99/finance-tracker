import { Social } from "@/components/social";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignInPage = async () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47] dark:text-[#9588e4]">
            Welcome Back!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in to your account to get back to your dashboard!
          </p>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Social />
        </div>
        <div className="text-base text-center text-[#7E8CA0] mt-4">
          Don&apos;t have an account?
          <Link href="/sign-up" className="underline ml-2 hover:text-blue-600">
            signup
          </Link>
        </div>
      </div>
      <div className="h-full bg-blue-600 dark:bg-blue-900 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="LOGO" height={100} width={100} />
      </div>
    </div>
  );
};

export default SignInPage;
