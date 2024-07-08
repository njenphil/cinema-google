import Image from "next/image"
import styles from "./page.module.css"
import ShowcaseSlider from "../../components/ShowcaseSlider"
import Search from "../../components/Search"
import CategoriesSlider from "../../components/CategoriesSlider"
import FAQ from "../../components/FAQ"

import { getServerSession } from "next-auth"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { generateSafcomAccessToken } from "@/safcomAccessToken"
import { tryOutFetchTransaction } from "@/lib/callSafcomFetchFunction"

export default function Home() {
  //await tryOutFetchTransaction({ amount: 10, phone: 254712990778, videoCode: "VID1001" })

  return (
    <>
      <ShowcaseSlider />
      <Search />
      <CategoriesSlider />
      <FAQ />
    </>
  )
}
