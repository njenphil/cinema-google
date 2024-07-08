import prisma from "@/lib/prismadb"
import { connect } from "http2"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  let { incomingEmail, mpesaCode, title } = await req.json()

  const newPurchase = await prisma.purchase.create({
    data: {
      mpesaCode,

      user: {
        connect: {
          email: incomingEmail
        }
      },
      show: {
        connect: {
          title: title
        }
      }
    }
  })
  return NextResponse.json(newPurchase)
}
