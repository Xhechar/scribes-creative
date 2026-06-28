import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Only imports authConfig — no Prisma, no bcrypt, no Node.js modules.
// Safe to run in the Edge Runtime.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};