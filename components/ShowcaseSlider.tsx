import Image from "next/image"
import React from "react"

const ShowcaseSlider = () => {
  return (
    <>
      <div className="showcase-image-slider">
        <i className="fas fa-angle-left left-arrow is-hidden" aria-hidden="true"></i>
        <i className="fas fa-angle-right right-arrow" aria-hidden="true"></i>
        <section className="showcase">
          <div className="showcase-slide active-thumbnail" style={{ backgroundImage: `linear-gradient(to right, hsla(0, 0%, 0%, 1), hsla(0, 0%, 0%, 0.5)), url(/showcase-background.webp)` }}>
            <div className="showcase-body-wrapper | container">
              <div className="showcase-body-content">
                <div className="ad-tag">NEW RELEASE</div>
                <div className="title-image">
                  <Image src="/title-image.svg" width={281} height={40} alt="cinema logo" />
                </div>
                <div className="show-properties">
                  <div className="hd-image">
                    <Image src="/4d-tag.svg" width={130} height={28} alt="4d tag" />
                  </div>
                  <div className="show-duration">1 hr 24min</div>
                </div>
                <div className="show-short-description">
                  <p>sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus</p>
                </div>
                <div className="show-links">
                  <a href="#">WATCH TRAILER</a>
                  <a href="#">FULL SHOW</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ShowcaseSlider
