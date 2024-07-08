"use client"

import React, { useState } from "react"
import PaymentModal from "./PaymentModal"
import { TShow } from "@/lib/types"

const CallToActionButtons = ({ theShow }: { theShow: TShow }) => {
  const [openModal, setOpenModal] = useState(false)

  const props = {
    theShow,
    closeModal: setOpenModal
  }

  return (
    <section className="add-to-list" style={{ backgroundColor: "white" }}>
      <div className="container">
        <button className="add-to-favourite-btn" onClick={() => setOpenModal(true)}>
          + BUY THIS SHOW
        </button>
      </div>
      {openModal && <PaymentModal props={props} />}
    </section>
  )
}

export default CallToActionButtons
