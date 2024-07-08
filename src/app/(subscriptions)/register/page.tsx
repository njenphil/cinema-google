import React from "react"

import "./register.css"
import RegisterForm from "@/components/RegisterForm"

const Register = () => {
  return (
    <section className="signin">
      <div className="section-wrapper">
        <h1 className="register-heading">Welcome to Cinema</h1>
        <RegisterForm />
      </div>
    </section>
  )
}

export default Register
