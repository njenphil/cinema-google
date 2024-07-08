"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useCinemaContext } from "../../../components/context"
import { useRouter } from "next/navigation"
import { TShow } from "../../../lib/types"

import "../../../lib/css/dashboard-page.css"
import DashboardShowcase from "../../../components/DashboardShowcase"
import AccountShowCard from "../../../components/AccountShowCard"

import SpecialShowCard from "../../../components/SpecialShowCard"
import WatchVideo from "@/components/WatchVideo"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  if (status == "unauthenticated") {
    router.push("/")
  }
  const categories = useCinemaContext().categories

  const [loadingShows, setLoadingShows] = useState(true)
  const [areThereShows, setAreThereShows] = useState(false)
  const [purchases, setPurchases] = useState([])
  const [showsBought, setShowsBought] = useState<TShow[]>([])
  const [clickWatchVideo, setClickWatchVideo] = useState(false)
  const [clickedVideo, setClickedVideo] = useState("")

  const userEmail = session?.user?.email

  useEffect(() => {
    const fetchAccountShows = async () => {
      const accountShowsData = await fetch("/api/get-shows-single-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmail
        })
      })
      const accountShows = await accountShowsData.json()
      setLoadingShows(false)
      if (accountShows.length) {
        setAreThereShows(true)

        setShowsBought(accountShows)
      }
    }

    if (status === "authenticated") fetchAccountShows()
  }, [status])

  const overlay = { backgroundColor: "black", position: "absolute", top: "50%", height: "150vh", width: "100%" }

  return (
    <>
      <section className={`${clickWatchVideo ? "classOverlay" : "dashboard-showcase"}`}>DashboardShowcase</section>

      {clickWatchVideo && <WatchVideo props={{ mainVideo: clickedVideo, setClickWatchVideo }} />}
      <div className="dashboard-heading | section-padding">
        <div className="dashboard-heading-wrapper | container">
          <h2>
            Welcome <strong>{session?.user?.name || "Viewer"}</strong>
          </h2>
          {loadingShows && <p>Loading your shows...</p>}
          {!loadingShows && <p>{areThereShows ? "Your account has these shows" : "You have not bought any show. Browse from this list"}</p>}
        </div>
      </div>
      {!areThereShows && !loadingShows ? (
        <div className="no-show | section-padding">
          <ul className="container">
            {categories &&
              categories.map((category, index: number) => {
                const link = category.toLowerCase().replace(" ", "-")
                return (
                  <li key={index}>
                    <Link href={`/category/${link}`}>{category}</Link>
                  </li>
                )
              })}
          </ul>
        </div>
      ) : (
        <section className="category-body | section-padding" style={{ backgroundColor: "white" }}>
          {clickWatchVideo && <div className="play-overlay"></div>}
          <div className="container">
            {showsBought &&
              showsBought.map((show: TShow) => {
                return <AccountShowCard props={{ actualCategory: show.categoryName, show, setClickWatchVideo, setClickedVideo }} key={show.id} />
              })}
          </div>
        </section>
      )}
    </>
  )
}

export default Dashboard
