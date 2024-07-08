import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 5000 })

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected")

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`)
    ws.send(`Server received your message: ${message}`)
  })

  ws.on("close", () => {
    console.log("Client disconnected")
  })
})
