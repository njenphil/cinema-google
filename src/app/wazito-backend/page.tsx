"use client"
import React, { useEffect, useState } from "react"

import "../../../lib/css/admin-styles.css"
import { KeyObject } from "crypto"
import CreateShow from "@/components/CreateShow"
import AddCategory from "@/components/AddCategory"
import EditShow from "@/components/EditShow"
import EditShowForm from "@/components/EditShowForm"
import { TShow } from "@/lib/types"

interface BigObject<T> {
  [index: string]: T
}

const initialState = {
  id: "",
  title: "",
  quality: "",
  qualityInWords: "",
  restriction: "",
  release: "",
  thumbnail: "",
  videoCode: "",
  price: "",
  urlTitle: "",
  trailer: "",
  mainVideo: "",
  showDescription: "",
  playtime: "",
  categoryName: "",
  userPhone: [],
  createdAt: "",
  updatedAt: ""
}

const AdminPage = () => {
  const [clickedButtons, setClickedButtons] = useState({
    createShow: true,
    editShow: false,
    addCategory: false
  })

  const [count, setCount] = useState(0)
  const [editButtonClicked, setEditButtonClicked] = useState(false)
  const [showToEdit, setShowToEdit] = useState<TShow>(initialState)

  const handleClickedButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    let clickedId = event.currentTarget.id
    setClickedButtons(prev => {
      let key: keyof typeof prev
      for (key in prev) {
        prev[key] = false
        if (key == clickedId) {
          prev[key] = true
        }
      }

      return prev
    })
    setCount(prev => prev + 1)
  }

  return (
    <>
      <section className="admin-showcase"></section>
      <section className="admin-body">
        <div className="container">
          <div className="panel">
            <button id="createShow" onClick={handleClickedButton}>
              Create show
            </button>
            <button id="editShow" onClick={handleClickedButton}>
              Edit show
            </button>
            <button id="addCategory" onClick={handleClickedButton}>
              Add category
            </button>
          </div>
          <div className="components">
            {clickedButtons.createShow && <CreateShow />}
            {clickedButtons.addCategory && <AddCategory />}
            {clickedButtons.editShow && <EditShow props={{ setEditButtonClicked, setShowToEdit }} />}
          </div>
        </div>
      </section>
      {editButtonClicked && <EditShowForm props={{ setEditButtonClicked, showToEdit }} />}
    </>
  )
}

export default AdminPage
