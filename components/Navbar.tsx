import Image from "next/image"
import React from "react"
import { categories } from "@/data"
import Link from "next/link"
import { signIn } from "next-auth/react"
import NavbarButtons from "./NavbarButtons"

export const Navbar = () => {
  return (
    <>
      <header>
        <div className="header-wrapper | container">
          <div className="cinema-logo">
            <Image src="/logo.svg" width={224} height={53} alt="cinema logo" />
          </div>
          <nav>
            <div className="home">
              <Link href="/" className="active">
                home
              </Link>
            </div>
            <div className="quote-statement-carousel-button-left is-hidden">
              <i className="fas fa-angle-left"></i>
            </div>
            <div className="quote-statement-carousel-button-right">
              <i className="fas fa-angle-right"></i>
            </div>
            <div className="genres">
              <ul>
                {categories &&
                  categories.map(category => {
                    const modifiedHref = category.categoryName.replace(" ", "-").toLowerCase()
                    return (
                      <Link href={`/category/${modifiedHref}`} key={category.id}>
                        {category.categoryName}
                      </Link>
                    )
                  })}
              </ul>
            </div>
          </nav>
          <NavbarButtons />
        </div>
      </header>
    </>
  )
}
