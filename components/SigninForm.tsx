"use client"

import React, { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"

const SigninForm = () => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn("credentials", {
      phone: phone.toString(),
      password: password,
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <div className="contact-form">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="number" id="phoneNumber" name="phone-number" required value={phone} onChange={e => setPhone(e.target.value)} />
          <span>Phone Number</span>
        </div>

        <div className="form-control">
          <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
          <span>Set password</span>
        </div>

        <div className="submit-area">
          <button type="submit">Sign in</button>
          <p className="already-registered">
            Dont have an account? <Link href="/register">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
