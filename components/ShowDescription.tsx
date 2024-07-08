import React from "react"
import { shows } from "@/data"
import { TShow } from "@/lib/types"

const ShowDescription = ({ theShow }: { theShow: TShow }) => {
  return (
    <section className="movie-description | section-padding">
      <div className="container">
        <div className="movie-info-box">
          <h2 className="movie-title">{theShow.title}</h2>
          <div className="movie-features">
            <p className="release-date">{theShow.release}</p>
            <div className="high-def-tag">
              {theShow.qualityInWords}
              <b>Ultra HD</b>
            </div>
            <p className="playtime">{theShow.playtime}</p>
            <div className="creative-commons">cc</div>
            <p className="category">{theShow.categoryName}</p>
          </div>
          <p className="the-description">{theShow.showDescription}</p>
          <ul className="production-info">
            <li>
              <h6>Director</h6>: <span>Mark Njoroge</span>
            </li>
            <li>
              <h6>Casting</h6>: <span>Philip Njenga</span>
            </li>
            <li>
              <h6>Production</h6>: <span>Paul Mburu</span>
            </li>
          </ul>
        </div>
        <div className="movie-thumbnail">
          <img src={theShow.thumbnail} alt={theShow.title} />
        </div>
      </div>
    </section>
  )
}

export default ShowDescription
