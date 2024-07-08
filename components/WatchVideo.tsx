import React, { useState } from "react"
import ReactPlayer from "react-player"

type PType = {
  mainVideo: string
  setClickWatchVideo: Function
}

const WatchVideo = ({ props }: { props: PType }) => {
  const [videoLoading, setVideoLoading] = useState(true)

  return (
    <>
      <section className="view-show-showcase" style={{ backgroundColor: "black" }}>
        <div className="container">
          <div className="close-video" onClick={() => props.setClickWatchVideo(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width="50" height="50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </section>

      <div className="the-show">
        <div className="container">
          <div className="video-player">
            {videoLoading && <PaymentLoader />}
            <div style={{ position: "absolute" }}>
              <ReactPlayer url={props.mainVideo} controls onReady={() => setVideoLoading(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const PaymentLoader = () => {
  return (
    <div className="spinner-wrapper" style={{ backgroundColor: "white", height: "360px", width: "640px" }}>
      <span className="loader"></span>
    </div>
  )
}

export default WatchVideo
