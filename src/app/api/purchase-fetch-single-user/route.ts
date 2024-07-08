import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { incomingEmail } = await req.json()

  const shows = await prisma.purchase.findMany({
    where: {
      userEmail: incomingEmail
    },
    orderBy: {
      purchasedOn: "desc"
    }
  })

  return NextResponse.json(shows)
}
