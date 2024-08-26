import { HeaderLogo } from "@/components/header/logo";
import { Navigation } from "@/components/header/navigation";
import { WelcomeMessage } from "@/components/header/welcome-msg";
import { Filters } from "@/components/header/filters";
import { UserButton } from "@/components/header/user-button";
import { ThemeMode } from "@/components/theme-mode-toggle";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 dark:from-blue-950 dark:to-blue-800 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <UserButton />
            <ThemeMode dark />
          </div>
        </div>
        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
};
