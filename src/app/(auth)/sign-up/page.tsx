import { Social } from "@/components/social";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47] dark:text-[#9588e4]">
            Welcome!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Create a new account to start tracking your finances!
          </p>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Social />
        </div>
        <div className="text-base text-center text-[#7E8CA0] mt-4">
          Already have an account?
          <Link href="/sign-in" className="underline ml-2 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
      <div className="h-full bg-blue-600 dark:bg-blue-900 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="LOGO" height={100} width={100} />
      </div>
    </div>
  );
};

export default SignUpPage;
