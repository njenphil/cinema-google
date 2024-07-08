import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const thePurchases = await prisma.purchase.findMany({
    where: {
      userEmail: email
    },
    include: {
      show: true
    },
    orderBy: {
      purchasedOn: "desc"
    }
  })

  const showsArray = thePurchases.map(purchase => purchase.show)

  return NextResponse.json(showsArray)
}
