"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";

export const UserButton = () => {
  const { user } = useUser();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback className="uppercase">
            {user?.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-xl">
        <div className="flex items-center justify-start gap-x-2 mb-4">
          <Avatar>
            <AvatarImage src={user?.image!} />
            <AvatarFallback className="capitalize">
              {user?.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Separator />
        <Button
          className="w-full justify-start mt-4"
          variant="outline"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
