"use client"
import React, { useEffect } from "react"
import { io } from "socket.io-client"
import { useSession, signOut } from "next-auth/react"

const TrackingLoggedInUsers = () => {
  const { data: session, status } = useSession()
  const loggedInUsersSocket = io("https://websocket-production-b0ae.up.railway.app/logged-in-users")

  useEffect(() => {
    if (status === "authenticated") {
      loggedInUsersSocket.emit("authentication", { userEmail: session?.user?.email, loggedInID: Date.now().toString() })
    }
  }, [status])

  loggedInUsersSocket.on("userExist", data => {
    const confirmResponse = confirm(data.message)
    if (!confirmResponse) {
      signOut()
    } else {
      loggedInUsersSocket.emit("logoutOtherCount")
    }
  })

  loggedInUsersSocket.on("logout", data => {
    signOut()
  })

  return <div style={{ display: "none" }}>TrackingLoggedInUsers</div>
}

export default TrackingLoggedInUsers
