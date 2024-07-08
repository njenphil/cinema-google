import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const theShows = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      purchases: true
    }
  })

  return NextResponse.json(theShows)
}
