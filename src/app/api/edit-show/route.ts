import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
  const { id, title, quality, qualityInWords, restriction, categoryName, release, thumbnail, videoCode, price, urlTitle, trailer, mainVideo, showDescription, playtime } = await req.json()

  try {
    const updatedShow = await prisma.show.update({
      where: { id },
      data: {
        title,
        quality,
        qualityInWords,
        restriction,

        release,
        thumbnail,
        videoCode,
        price,
        urlTitle,
        trailer,
        mainVideo,
        showDescription,
        playtime,
        category: {
          connect: {
            categoryName: categoryName
          }
        }
      }
    })

    return NextResponse.json("Show is updated")
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: "Error updating show" })
  }
}
