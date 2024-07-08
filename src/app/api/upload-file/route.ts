import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(req: Request) {
  const data = await req.formData()

  const file: File | null = data.get("file") as unknown as File

  if (!file) {
    return NextResponse.json({ message: "error uploading file" })
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = `./public/${file.name}`

    await writeFile(path, buffer)
    //console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ message: path })
  } catch (e) {
    return NextResponse.json({ message: "failed to upload image" })
  }
}
