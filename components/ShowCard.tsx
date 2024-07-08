import React from "react"
import { TShow } from "../lib/types"

type PTprops = {
  director: string
  casting: string
  producer: string
}

const ShowCard = ({ show }: { show: TShow }) => {
  const { title, quality, restriction, categoryName, release, thumbnail, id, urlTitle } = show
  return (
    <div className="show-slider-card">
      <a href={`category/${categoryName.replace(" ", "-").toLowerCase()}/${urlTitle}`}>
        <div className="show-slider-card-image" style={{ backgroundImage: `url(${thumbnail})` }}>
          <div className="to-display-on-hover">
            <img src={quality} alt="4d tag" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </a>
      <div className="show-slider-description">
        <div className="rating-and-premiered">
          <p className="parental-guidance">{restriction}</p>
          <p>{release}</p>
        </div>
        <p className="show-category">{categoryName}</p>
        <a href={`category/${categoryName.replace(" ", "-").toLowerCase()}/${urlTitle}`}>
          <h3 className="show-slide-title">{title}</h3>
        </a>
      </div>
    </div>
  )
}

export default ShowCard
