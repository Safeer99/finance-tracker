"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2" style={{ marginBottom: "1rem" }}>
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back{isLoaded ? ", " : ""} {user?.firstName} 👋🏼
      </h2>
      <p className="text-sm lg:text-base" style={{ color: "#89b6fd" }}>
        This is your Financial Overview Report
      </p>
    </div>
  );
};
