import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const allShows = await prisma.show.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(allShows)
  } catch (e) {
    console.log(e)
  }
}

export async function POST(req: Request) {
  const { category } = await req.json()
  try {
    const categoryShows = await prisma.show.findMany({
      where: {
        categoryName: category
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(categoryShows)
  } catch (e) {
    console.log(e)
  }
}
