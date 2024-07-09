"use client"

import React, { useEffect, useRef, useState } from "react"

import { signIn, useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { useCinemaContext } from "../components/context"

const NavbarButtons = () => {
  const { status, data: session } = useSession()
  const logoutButtonRef = useRef<HTMLDivElement | null>(null)

  const [room, setRoom] = useState("")
  const [merchantId, setMerchantId] = useState("")

  const { signoutButton, setSignoutButton } = useCinemaContext()

  const router = useRouter()

  const avatarStyles = {
    width: "30px",
    height: "30px",
    display: "block",
    borderRadius: "50%"
  }

  return (
    <>
      {status === "authenticated" ? (
        <div className="login">
          <div className="register" onClick={() => router.replace("/dashboard")}>
            <div className="loggedin-user" style={{ cursor: "pointer" }}>
              <div className="avatar">
                <Image src={session?.user?.image || "avatar"} alt={session?.user?.name || "user"} style={avatarStyles} width="30" height="30" />
              </div>
              <span>{session?.user?.name}</span>
            </div>
          </div>
          <div className="login-btn" ref={logoutButtonRef}>
            <button onClick={() => signOut()} style={{ marginRight: "0", marginLeft: "0.5rem", border: "thin solid #07BBFF", backgroundColor: "#07BBFF" }}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="login">
          <div className="login-btn">
            <button onClick={() => signIn()}>login</button>
          </div>
          <div className="register">
            <button>pay</button>
          </div>
        </div>
      )}
    </>
  )
}

export default NavbarButtons
