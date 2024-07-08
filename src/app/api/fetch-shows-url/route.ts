import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { urlTitle } = await req.json()

  const theShows = await prisma.show.findMany({
    where: {
      urlTitle: urlTitle
    }
  })

  return NextResponse.json(theShows)
}
