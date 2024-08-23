"use client";

import { useUser } from "@/hooks/use-user";

export const WelcomeMessage = () => {
  const { user } = useUser();

  return (
    <div className="space-y-2" style={{ marginBottom: "1rem" }}>
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back {user?.name} 👋🏼
      </h2>
      <p className="text-sm lg:text-base" style={{ color: "#89b6fd" }}>
        This is your Financial Overview Report
      </p>
    </div>
  );
};
