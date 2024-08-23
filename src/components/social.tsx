"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col max-w-64 w-full gap-x-2">
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button> */}
      <Button size="lg" className="w-full" onClick={() => onClick("github")}>
        <FaGithub className="size-6" />
      </Button>
    </div>
  );
};
