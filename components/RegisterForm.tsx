"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const router = useRouter()

  const submitUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userName || !userPhone || !userPassword) {
      const errorMessage = "All fields are required"
      //toast.error(errorMessage);
      return
    }

    /*try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          phone: userPhone,
          password: userPassword
        })
      })

      if (res.ok) {
        //toast.success("Post created successfully")
        router.push("/")
        router.refresh()
      } else {
        //toast.error("Something went wrong.")
      }
    } catch (error) {
      console.log(error)
    }*/
  }

  return (
    <div className="contact-form">
      <form action="" onSubmit={submitUserData}>
        <div className="form-control">
          <input type="text" id="fullName" name="full-name" required value={userName} onChange={e => setUserName(e.target.value)} />
          <span>Full Name</span>
        </div>
        <div className="form-control">
          <input type="number" id="phoneNumber" name="phone-number" required value={userPhone} onChange={e => setUserPhone(e.target.value)} />
          <span>Phone Number</span>
        </div>

        <div className="form-control">
          <input type="password" id="password" name="password" required value={userPassword} onChange={e => setUserPassword(e.target.value)} />
          <span>Set password</span>
        </div>

        <p className="terms-disclaimer">By submitting this form, I agree to all terms and conditions regarding data protection of Cinema</p>
        <div className="submit-area">
          <button type="submit">Register</button>
          <p className="already-registered">
            Have an account? <Link href="/signin">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
