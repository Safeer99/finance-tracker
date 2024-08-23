import { auth } from "@/auth";

export const getAuth = async () => {
  const session = await auth();

  return {
    userId: session?.user?.id,
    ...session?.user,
  };
};
