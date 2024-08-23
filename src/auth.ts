import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { authAccounts, sessions, users, verificationTokens } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    verificationTokensTable: verificationTokens,
    accountsTable: authAccounts,
    usersTable: users,
    sessionsTable: sessions,
  }),
  secret: process.env.AUTH_SECRET,
  providers: [Github],
});
