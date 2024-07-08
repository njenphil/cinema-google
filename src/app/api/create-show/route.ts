import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { title, quality, qualityInWords, restriction, categoryName, release, thumbnail, videoCode, price, urlTitle, trailer, mainVideo, showDescription, playtime } = await req.json()

  try {
    const newShow = await prisma.show.create({
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

    return NextResponse.json("New show created")
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: "Error creating post" })
  }
}
