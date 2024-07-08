"use client"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { tryOutFetchTransaction } from "@/lib/callSafcomFetchFunction"
import { io } from "socket.io-client"
import { TShow } from "@/lib/types"

interface TestProps {
  closeModal: (Status: boolean) => void
  theShow: TShow
}

const PaymentModal = ({ props }: { props: TestProps }) => {
  const { data: session, status } = useSession()
  //const userPhone = session?.user?.phone

  const { closeModal } = props
  const { theShow } = props
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorProcessing, setErrorProcessing] = useState(false)
  const [isSafaricomChecked, setIsSafaricomChecked] = useState(true)
  const [safaricomNumber, setSafaricomNumber] = useState("")
  const [airtelNumber, setAirtelNumber] = useState("")
  const pathname = usePathname()

  const router = useRouter()

  /*const [socket, setSocket] = useState(io("http://localhost:5000"))

  const joinRoom = (id: string) => {
    socket.emit("join_room", id)
  }*/

  /*useEffect(() => {
    socket.on("eventId", response => {
      const simulatePayment = async () => {
        let newPurchaseData = await fetch("/api/purchase-create", {
          method: "POST",
          body: JSON.stringify({
            title: theShow.title,
            mpesaCode: response.mpesaReceiptNumber || "PKHGA",
            incomingEmail: session?.user?.email
          })
        })

        const newPurchase = await newPurchaseData.json()
        setIsProcessing(false)
        alert("Payment processed successfully. You will be directed to your dashboard")
        router.push("/dashboard")
      }
      if (response.resultDesc == "The service request is processed successfully.") {
        simulatePayment()
      } else {
        setIsProcessing(false)
        alert(response.resultDesc)
        router.push(pathname)
      }
      //if (response.resultDesc != "The service request is processed successfully.") setIsProcessing(false)
    })

    //setEventId("")
  }, [])*/

  function removeModal() {
    setErrorProcessing(false)
  }

  const simulatePayment = async () => {
    let newPurchaseData = await fetch("/api/purchase-create", {
      method: "POST",
      body: JSON.stringify({
        title: theShow.title,
        mpesaCode: "PKHGA",
        incomingEmail: session?.user?.email
      })
    })

    const newPurchase = await newPurchaseData.json()

    router.push("/dashboard")

    setTimeout(() => {
      setIsProcessing(false)
      //console.log(newPurchase)
    }, 500)
  }

  const payfunction = async () => {
    setIsProcessing(true)
    const network = isSafaricomChecked ? "safaricom" : "airtel"
    console.log(safaricomNumber)

    await simulatePayment()

    /*if (network == "safaricom") {
      const payment = await tryOutFetchTransaction({ amount: parseInt(theShow.price), phone: safaricomNumber, videoCode: theShow.videoCode })

      console.log(payment)

      if (payment.paymentResData.ResponseCode == "0") {
        const merchantId = payment.paymentResData.MerchantRequestID

        socket.emit("registerPayment", merchantId)

        joinRoom(merchantId)

        console.log(payment)
      } else {
        alert(payment.paymentResData.CustomerMessage)
        setIsProcessing(false)
      }
    }*/
  }

  const selectedLine = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.id == "safaricom") {
      setIsSafaricomChecked(true)
      setAirtelNumber("")
    } else {
      setIsSafaricomChecked(false)
      setSafaricomNumber("")
    }
  }

  return (
    <article className="modal-background">
      <div className="modal-wrapper">
        {isProcessing ? (
          <PaymentLoader />
        ) : (
          <>
            <div className="modal-close-btn" onClick={() => closeModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="modal-body">
              <div className="payment-details">
                <div className="price-title">
                  <h1>KES {theShow.price}</h1>
                </div>

                <div className="select-phone-number">
                  <p>Select Network</p>
                  <div className="networks">
                    <div className="network">
                      <input type="radio" name="phone" defaultChecked id="safaricom" onChange={e => selectedLine(e)} />
                      <label htmlFor="safaricom">Safaricom</label>
                      <input type="text" placeholder="Safaricom Number" onChange={e => setSafaricomNumber(e.target.value)} value={safaricomNumber} />
                    </div>
                    <div className="network">
                      <input type="radio" name="phone" id="airtel" onChange={e => selectedLine(e)} />
                      <label htmlFor="airtel">Airtel</label>
                      <input type="text" placeholder="Airtel Number" onChange={e => setAirtelNumber(e.target.value)} value={airtelNumber} />
                    </div>
                  </div>
                </div>
                <div className="account-summary">
                  <p>Amount: KES{theShow.price}</p>
                  <p style={{ fontWeight: "500", fontSize: "18px" }}>
                    *We are only accepting mpesa payments
                    <br /> only at the moment
                  </p>
                </div>
              </div>
              <div className="video-brief">
                <div className="video-thumbnail">
                  <img src={theShow.thumbnail} alt="" />
                </div>
                <div className="video-bio">
                  <div className="video-name">
                    <h4>Video Name</h4>
                    <p>{theShow.title}</p>
                  </div>
                  <div className="video-name">
                    <h4>Video Code</h4>
                    <p>{theShow.videoCode}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-btns">
              <button className="pay" onClick={payfunction}>
                PAY KES{theShow.price}
              </button>
              <button className="cancel" onClick={() => closeModal(false)}>
                CANCEL
              </button>
            </div>
          </>
        )}
      </div>
      {errorProcessing && "Error processing...try again"}
    </article>
  )
}

const PaymentLoader = () => {
  return (
    <div className="spinner-wrapper">
      <span className="loader"></span>
    </div>
  )
}

export default PaymentModal
