import { ThemeMode } from "@/components/theme-mode-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Settings page</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="gap-y-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold line-clamp-1">Theme</h3>
            <ThemeMode />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
