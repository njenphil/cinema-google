import React from "react"
import { TShow } from "@/lib/types"

const SingleShowShowcase = ({ theShow }: { theShow: TShow }) => {
  return <section className="single-show-showcase" style={{ backgroundImage: "linear-gradient(to right, hsla(0, 0%, 0%, 1), hsla(0, 0%, 0%, 0.5)), url(/for-blur.webp)", filter: "blur(50px); -webkit-filter: blur(50px)" }}></section>
}

export default SingleShowShowcase
