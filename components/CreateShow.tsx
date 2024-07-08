import React, { SyntheticEvent, useState } from "react"
import { CldUploadButton, CloudinaryUploadWidgetResults, CldUploadWidget } from "next-cloudinary"
import { useCinemaContext } from "./context"

const formInputsInitial = {
  showTitle: "",
  quality: "",
  qualityInWords: "",
  showRestriction: "",
  showRelease: "",
  thumbnail: "",
  showCode: "",
  price: "",
  videoPrice: "",
  trailerLink: "",
  mainVideoLink: "",
  showDescription: "",
  videoPlaytime: "",
  choosenCategory: "Action",
  showUrl: ""
}

type TShow = {
  showTitle: string
  quality: string
  qualityInWords: string
  showRestriction: string
  showRelease: string
  thumbnail: string
  showCode: string
  price: string
  videoPrice: string
  trailerLink: string
  mainVideoLink: string
  showDescription: string
  videoPlaytime: string
  choosenCategory: string
  showUrl: string
  [key: string]: any
}

const CreateShow = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState<File>()

  const [showTitle, setShowTitle] = useState("")
  const [quality, setQuality] = useState("")
  const [qualityInWords, setQualityInWords] = useState("")
  const [showRestriction, setShowRestriction] = useState("")
  const [showRelease, setShowRelese] = useState("")
  const [showCode, setShowCode] = useState("")
  const [videoPrice, setVideoPrice] = useState("")
  const [trailerLink, setTrailerLink] = useState("")
  const [mainVideoLink, setMainVideoLink] = useState("")
  const [showDescription, setShowDescription] = useState("")
  const [videoPlaytime, setVideoPlaytime] = useState("")
  const [choosenCategory, setChoosenCategory] = useState("")
  const [showUrl, setShowUrl] = useState("")

  const { categories } = useCinemaContext()

  /*const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clickedInputId = e.currentTarget.id
    const value = e.currentTarget.value

    setFormInputs(prev => {
      prev[clickedInputId] = value
      return prev
    })
    console.log(formInputs.showTitle)
  }*/

  const handleFormDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowDescription(e.currentTarget.value)
  }

  const handleFormCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChoosenCategory(e.currentTarget.value)
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

    const newShowData = await fetch("/api/create-show", {
      method: "POST",
      body: JSON.stringify({
        title: showTitle,
        quality: quality,
        qualityInWords: qualityInWords,
        restriction: showRestriction,

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
    const newshow = await newShowData.json()
    alert(newshow)
  }

  return (
    <>
      <h1 className="component-title">Create show</h1>
      <div className="component-details">
        <div className="show-details-form">
          <form onSubmit={saveToDatabase}>
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
            <input type="submit" value="Create show" />
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateShow
