import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  //const { category } = await req.json()
  try {
    const allCategories = await prisma.category.findMany()
    return NextResponse.json(allCategories)
  } catch (e) {
    console.log(e)
  }
}
