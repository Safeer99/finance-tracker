import { useSession } from "next-auth/react";

export const useUser = () => {
  const session = useSession();

  return {
    user: {
      ...session?.data?.user,
    },
  };
};
