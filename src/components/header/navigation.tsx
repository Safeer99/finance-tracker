"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavButton } from "@/components/header/nav-button";
import { useMedia } from "react-use";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const [open, setOpen] = useState(false);

  const pathWithSearchParams = (href: string) => {
    const sp = searchParams.toString();
    const path = `${href}${sp.length > 0 ? `?${sp}` : ""}`;
    return path;
  };

  const onClick = (href: string) => {
    const path = pathWithSearchParams(href);
    router.push(path);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetTitle></SheetTitle>
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={pathWithSearchParams(route.href)}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
