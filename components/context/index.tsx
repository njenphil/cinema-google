"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react"

interface Context {
  categories: string[]
  example: string
  signoutButton: HTMLDivElement | null
  setSignoutButton: Function
}

interface Category {
  id: string
  categoryName: string
  showIDs: string[]
  categoryImage: string
  categoryDescription: string
}

const CinemaContext = createContext<Context>({ categories: [], example: "", signoutButton: null, setSignoutButton: function () {} })

export const CinemaContextWrapper = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  let [categories, setCategories] = useState<string[]>(["Adventure", "Romantic Commedy", "Horror"])
  let [example, setExample] = useState<string>("after loading")
  const [signoutButton, setSignoutButton] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategoriesData = await fetch("/api/fetch-category")
      const allCategories = await allCategoriesData.json()

      const categoriesName = allCategories.map((category: Category) => category.categoryName)
      setCategories(categoriesName)
    }

    fetchCategories()
  }, [])

  return <CinemaContext.Provider value={{ categories, example, signoutButton, setSignoutButton }}>{children}</CinemaContext.Provider>
}

export const useCinemaContext = () => {
  return useContext(CinemaContext)
}
