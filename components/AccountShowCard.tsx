"use client"
import React, { useEffect, useState } from "react"
import { TShow } from "@/lib/types"
import Link from "next/link"
import WatchVideo from "./WatchVideo"

type PType = {
  show: TShow
  actualCategory: string
  setClickWatchVideo: Function
  setClickedVideo: Function
}

const SpecialShowCard = ({ props }: { props: PType }) => {
  const { actualCategory } = props
  const { show } = props

  const categoryLink = actualCategory.replace(" ", "-").toLowerCase()

  const handleWatchButtonClick = () => {
    props.setClickWatchVideo(true)
    props.setClickedVideo(props.show.mainVideo)
  }

  return (
    <div className="show-slider-card">
      <div className="show-slider-card-image" style={{ backgroundImage: `url(${show.thumbnail})` }}>
        <div className="to-display-on-hover">
          <img src={show.quality} alt="4d tag" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="show-slider-description">
        <div className="rating-and-premiered">
          <p className="parental-guidance">{show.restriction}</p>
          <p>{show.release}</p>
        </div>
        <p className="show-category">{show.categoryName}</p>
        <div>
          <h3 className="show-slide-title">{show.title}</h3>
        </div>
      </div>
      <button className="watch" onClick={handleWatchButtonClick}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
        </svg>
        Watch Show
      </button>
    </div>
  )
}

export default SpecialShowCard
