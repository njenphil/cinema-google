import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { emitResponseEvent } from "@/lib/emitResponseEvent"

export async function POST(req: Request) {
  //console.log("STK PUSH CALLBACK")
  const body = await req.json()
  const safResponse = body

  //console.log("testing: ", safResponse)

  const merchantRequestID = safResponse.Body.stkCallback.MerchantRequestID
  const resultDesc = safResponse.Body.stkCallback.ResultDesc

  const mpesaReceiptNumber = safResponse.Body.stkCallback.CallbackMetadata?.Item[1].Value || ""
  const amount = safResponse.Body.stkCallback.CallbackMetadata?.Item[0].Value || ""
  const phoneNumber = safResponse.Body.stkCallback.CallbackMetadata?.Item[4].Value || ""

  // save all the fields from safcom

  try {
    await prisma.safcomResponse.create({ data: { merchantRequestID, resultDesc, mpesaCode: mpesaReceiptNumber } })
  } catch (error) {}

  try {
    await prisma.payment.create({
      data: {
        merchantRequestID,
        resultDesc,
        amount: amount.toString(),
        phoneNumber: phoneNumber.toString(),
        mpesaCode: mpesaReceiptNumber
      }
    })
  } catch (error) {
    //console.log(error)
  }

  return NextResponse.json({ data: safResponse }, { status: 201 })
  /*const merchantRequestID = req?.body?.Body?.stkCallback.MerchantRequestID
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID
  const resultCode = req.body.Body.stkCallback.ResultCode
  const resultDesc = req.body.Body.stkCallback.ResultDesc
  const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata
  const amount = callbackMetadata.Item[0].Value
  const mpesaReceiptNumber = callbackMetadata.Item[1].Value
  const transactionDate = callbackMetadata.Item[3].Value
  const phoneNumber = callbackMetadata.Item[4].Value

  console.log("MerchantRequestID:", merchantRequestID)
  console.log("CheckoutRequestID:", checkoutRequestID)
  console.log("ResultCode:", resultCode)
  console.log("ResultDesc:", resultDesc)

  console.log("Amount:", amount)
  console.log("MpesaReceiptNumber:", mpesaReceiptNumber)
  console.log("TransactionDate:", transactionDate)
  console.log("PhoneNumber:", phoneNumber)

  var json = JSON.stringify(req.body)
  fs.writeFile("stkcallback.json", json, "utf8", function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("STK PUSH CALLBACK STORED SUCCESSFULLY")
  })*/
}
