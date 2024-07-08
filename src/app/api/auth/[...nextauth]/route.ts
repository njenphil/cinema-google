import prisma from "@/lib/prismadb"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],

  secret: process.env.NEXTAUTH_SECRET
  /*pages: {
    signIn: "/signin"
  }*/
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
