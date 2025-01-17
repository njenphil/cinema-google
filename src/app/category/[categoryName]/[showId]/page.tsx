import React from "react"
import { cookies } from "next/headers"

import "../../../../../lib/css/single-show.css"
import SingleShowShowcase from "@/components/SingleShowShowcase"
import Trailer from "@/components/Trailer"
import ShowDescription from "@/components/ShowDescription"
import CallToActionButtons from "@/components/CallToActionButtons"
import RelatedShows from "@/components/RelatedShows"

type TSingleShow = {
  categoryName: string
  showId: string
}

const defaultParams = {
  categoryName: "adventure",
  showId: "teenage_fantasy"
}

export const dynamic = "force-dynamic" // to facilitate loading from non cache

const SingleShowPage = async ({ params = defaultParams }: { params: TSingleShow }) => {
  cookies()
  const showId = params?.showId

  const theShow = await fetch(`${process.env.HOME_URL}api/fetch-shows-url`, {
    method: "POST",
    body: JSON.stringify({
      urlTitle: showId
    })
  })

  const theShowDetails = await theShow.json()

  return (
    <>
      <SingleShowShowcase theShow={theShowDetails[0]} />
      <Trailer />
      <ShowDescription theShow={theShowDetails[0]} />
      <CallToActionButtons theShow={theShowDetails[0]} />
      <RelatedShows />
    </>
  )
}

export default SingleShowPage
