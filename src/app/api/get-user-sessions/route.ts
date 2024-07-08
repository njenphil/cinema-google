import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const userSessions = await prisma.user.findUnique({
    where: {
      email: email
    },
    include: {
      sessions: true
    }
  })

  return NextResponse.json(userSessions)
}
