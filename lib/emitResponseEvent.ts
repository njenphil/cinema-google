import { io } from "socket.io-client"

export const emitResponseEvent = (merchantRequestID: string, resultDesc: string, mpesaReceiptNumber: string) => {
  const socket = io("http://localhost:5000")
  socket.emit("safCallbackResponse", { merchantRequestID, resultDesc, mpesaReceiptNumber })
}
