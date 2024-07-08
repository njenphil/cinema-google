import React from "react"

const Trailer = () => {
  return (
    <div className="trailer">
      <div className="container">
        <div className="video-player">
          <iframe src="https://www.youtube.com/embed/MnHTLh6ruW0?si=_5nnIFB35nTkWZcU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default Trailer
