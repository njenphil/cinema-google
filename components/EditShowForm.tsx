"use client"

import React, { SyntheticEvent, useState } from "react"
import { CldUploadButton, CloudinaryUploadWidgetResults, CldUploadWidget } from "next-cloudinary"
import { useCinemaContext } from "./context"
import { TShow } from "@/lib/types"

type PType = {
  showToEdit: TShow

  setEditButtonClicked: Function
}

const EditShowForm = ({ props }: { props: PType }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<File>()
  const [editFormOpen, setEditFormOpen] = useState(true)

  const [showTitle, setShowTitle] = useState(props.showToEdit.title)
  const [quality, setQuality] = useState(props.showToEdit.quality)
  const [qualityInWords, setQualityInWords] = useState(props.showToEdit.qualityInWords)
  const [showRestriction, setShowRestriction] = useState(props.showToEdit.restriction)
  const [showRelease, setShowRelese] = useState(props.showToEdit.release)
  const [showCode, setShowCode] = useState(props.showToEdit.videoCode)
  const [videoPrice, setVideoPrice] = useState(props.showToEdit.price)
  const [trailerLink, setTrailerLink] = useState(props.showToEdit.trailer)
  const [mainVideoLink, setMainVideoLink] = useState(props.showToEdit.mainVideo)
  const [showDescription, setShowDescription] = useState(props.showToEdit.showDescription)
  const [videoPlaytime, setVideoPlaytime] = useState(props.showToEdit.playtime)
  const [choosenCategory, setChoosenCategory] = useState(props.showToEdit.categoryName)
  const [showUrl, setShowUrl] = useState(props.showToEdit.urlTitle)

  const { categories } = useCinemaContext()

  const handleFormDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowDescription(e.currentTarget.value)
  }

  const handleFormCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChoosenCategory(e.currentTarget.value)
  }

  const handleModalClose = () => {
    setEditFormOpen(false)
    props.setEditButtonClicked(false)
  }

  const uploadImage = async () => {
    if (!thumbnailUrl) return

    try {
      const data = new FormData()

      data.set("file", thumbnailUrl)

      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: data
      })

      const resData = await res.json()

      // handle the error
      if (!res.ok) throw new Error(await res.text())
      return resData
    } catch (e: any) {
      // Handle errors here
      return { message: "failed to upload image" }
    }
  }

  const saveToDatabase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!thumbnailUrl) {
      alert("You must upload show thumbnail")
      return
    }

    await uploadImage()

    const updatedShowData = await fetch("/api/edit-show", {
      method: "PUT",
      body: JSON.stringify({
        title: showTitle,
        quality: quality,
        qualityInWords: qualityInWords,
        restriction: showRestriction,
        id: props.showToEdit.id,
        release: showRestriction,
        thumbnail: `/${thumbnailUrl.name}`,
        videoCode: showCode,
        price: videoPrice,
        urlTitle: showUrl,
        trailer: trailerLink,
        mainVideo: mainVideoLink,
        showDescription: showDescription,
        playtime: videoPlaytime,
        categoryName: choosenCategory
      })
    })
    const updatedShow = await updatedShowData.json()
    alert(updatedShow)
    setEditFormOpen(false)
    props.setEditButtonClicked(false)
  }

  return (
    <>
      {editFormOpen && (
        <section className="edit-show-form | section-padding">
          <div className="close-show-edit-form | container">
            <button onClick={handleModalClose}>close</button>
          </div>

          <div className="show-details-form | container" style={{ backgroundColor: "white" }}>
            <form onSubmit={e => saveToDatabase(e)}>
              <div className="form-inputs">
                <div>
                  <div className="form-control">
                    <label>Enter the show title</label>
                    <input type="text" id="showTitle" placeholder="Enter show title" onChange={e => setShowTitle(e.target.value)} value={showTitle} />
                  </div>
                  <div className="form-control">
                    <label>Enter the quality label</label>
                    <input type="text" id="quality" placeholder="For 4k; enter /4d-tag.svg, For 8k;/8d-tag.svg" onChange={e => setQuality(e.target.value)} value={quality} />
                  </div>
                  <div className="form-control">
                    <label>Enter quality in words</label>
                    <input type="text" id="qualityInWords" placeholder="Enter quality in words e.g. 4k, 8k" onChange={e => setQualityInWords(e.target.value)} value={qualityInWords} />
                  </div>
                  <div className="form-control">
                    <label>Enter age restriction</label>
                    <input type="text" id="showRestriction" placeholder="Enter age restriction e.g. PG-18" onChange={e => setShowRestriction(e.target.value)} value={showRestriction} />
                  </div>
                  <div className="form-control">
                    <label>Enter the show release date</label>
                    <input type="text" id="showRelease" placeholder="Enter show release e.g. Feb 2024" onChange={e => setShowRelese(e.target.value)} value={showRelease} />
                  </div>
                  <div className="form-control">
                    <label>Upload show thumbnail</label>
                    <input type="file" name="show-thumbnail" onChange={e => setThumbnailUrl(e.target.files?.[0])} />
                  </div>

                  <div className="form-control">
                    <label>Enter video code</label>
                    <input type="text" id="showCode" placeholder="Enter show code e.g. VID001" onChange={e => setShowCode(e.target.value)} value={showCode} />
                  </div>
                  <div className="form-control">
                    <label>Enter video price</label>
                    <input type="text" id="videoPrice" placeholder="Enter video price e.g. 60" onChange={e => setVideoPrice(e.target.value)} value={videoPrice} />
                  </div>
                </div>
                <div>
                  <div className="form-control">
                    <label>Enter the trailer link</label>
                    <input type="text" id="trailerLink" placeholder="Enter the trailer link" onChange={e => setTrailerLink(e.target.value)} value={trailerLink} />
                  </div>
                  <div className="form-control">
                    <label>Enter the main video link</label>
                    <input type="text" id="mainVideoLink" placeholder="Enter the main video link" onChange={e => setMainVideoLink(e.target.value)} value={mainVideoLink} />
                  </div>
                  <div className="form-control">
                    <label>Enter the playtime</label>
                    <input type="text" id="videoPlaytime" placeholder="Enter the playtime e.g. 1hr 24min" onChange={e => setVideoPlaytime(e.target.value)} value={videoPlaytime} />
                  </div>
                  <div className="form-control">
                    <label>Enter url title</label>
                    <input type="text" id="showUrl" placeholder="Enter the url title e.g. romantic_comedy" onChange={e => setShowUrl(e.target.value)} value={showUrl} />
                  </div>

                  <div className="form-control">
                    <label>Enter the show description</label>
                    <textarea id="showDescription" placeholder="Show description here" onChange={event => handleFormDescription(event)} value={showDescription}></textarea>
                  </div>
                  <div className="form-control">
                    <label>Choose category</label>
                    <select name="category" id="choosenCategory" onChange={e => handleFormCategory(e)} value={choosenCategory}>
                      {categories &&
                        categories.map((category: string) => {
                          return (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <input type="submit" value="Edit show" />
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default EditShowForm
