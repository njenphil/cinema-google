import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function POST(req: Request) {
  const { merchantRequestID } = await req.json()
  try {
    const payment = await prisma.payment.findMany({
      where: {
        merchantRequestID
      }
    })

    return NextResponse.json(payment)
  } catch (e) {}
}
