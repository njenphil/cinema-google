import React from "react"
import { TShow } from "@/lib/types"
import Link from "next/link"

const SpecialShowCard = async ({ actualCategory }: { actualCategory: string }) => {
  const categoryShowsData = await fetch(`${process.env.HOME_URL}api/fetch-all-shows`, {
    method: "POST",
    body: JSON.stringify({
      category: actualCategory
    })
  })

  const categoryShows = await categoryShowsData.json()

  const categoryLink = actualCategory.replace(" ", "-").toLowerCase()
  return (
    <section className="category-body | section-padding">
      <div className="container">
        {categoryShows &&
          categoryShows.map((categoryShow: TShow) => {
            return (
              <div className="show-slider-card" key={categoryShow.id}>
                <a href={`/category/${categoryLink}/${categoryShow.urlTitle}`}>
                  <div className="show-slider-card-image" style={{ backgroundImage: `url(${categoryShow.thumbnail})` }}>
                    <div className="to-display-on-hover">
                      <img src={categoryShow.quality} alt="4d tag" />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
                <div className="show-slider-description">
                  <div className="rating-and-premiered">
                    <p className="parental-guidance">{categoryShow.restriction}</p>
                    <p>{categoryShow.release}</p>
                  </div>
                  <p className="show-category">{categoryShow.categoryName}</p>
                  <a href={`/category/${categoryLink}/${categoryShow.urlTitle}`}>
                    <h3 className="show-slide-title">{categoryShow.title}</h3>
                  </a>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default SpecialShowCard
