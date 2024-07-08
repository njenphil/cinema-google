import React, { useState, useEffect } from "react"
import { TShow } from "@/lib/types"
type PType = {
  //show: TShow

  setEditButtonClicked: Function
  setShowToEdit: Function
}

const EditShow = ({ props }: { props: PType }) => {
  const [allShows, setAllShows] = useState<TShow[]>([])

  const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.setEditButtonClicked(true)

    const clickedShow = allShows.find((show: TShow) => show.id == event.currentTarget.id)
    props.setShowToEdit(clickedShow)
  }

  useEffect(() => {
    const fetchAllShows = async () => {
      const allShowsData = await fetch("/api/fetch-all-shows")
      const allShows = await allShowsData.json()
      setAllShows(allShows)
    }

    fetchAllShows()
  }, [])

  return (
    <>
      <h1 className="component-title">Edit show</h1>
      <div className="component-details">
        <table>
          <thead>
            <tr>
              <th>Show title</th>
              <th>Show Id</th>
              <th>Show category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allShows &&
              allShows.map((show: TShow) => {
                return (
                  <tr key={show.id}>
                    <td>{show.title}</td>
                    <td>{show.id}</td>
                    <td>{show.categoryName}</td>
                    <td>
                      <button className="show-edit-btn" id={show.id} onClick={e => handleEditButton(e)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EditShow
