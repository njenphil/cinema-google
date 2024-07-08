import React from "react"
import "./category-page.css"

import { categories } from "@/data"
import CategoryPageShowcase from "@/components/CategoryPageShowcase"

import SpecialShowCard from "@/components/SpecialShowCard"
import Pagination from "@/components/Pagination"

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
  const categoryLink = params.categoryName.replaceAll("-", " ")

  const categoryToArray = categoryLink.split(" ").map(category => category[0].toUpperCase() + category.substring(1))

  const actualCategory = categoryToArray.join(" ")

  return (
    <>
      {actualCategory ? (
        <div>
          <CategoryPageShowcase actualCategory={actualCategory} />

          <SpecialShowCard actualCategory={actualCategory} />
          <Pagination />
        </div>
      ) : (
        <h1 style={{ color: "white" }}>Page not found</h1>
      )}
    </>
  )
}

export default CategoryPage
