import app from './index'
import { Server, Socket } from 'socket.io'
import { ping } from './sockets/index'

const port = process.env.PORT || 5000
const io = new Server(app)

io.on('connection', (socket: Socket) => {
  console.log('user connected -> ', socket.data)
  socket.on('ping', ping)
})

app.listen(port, () => {
  console.log('🚀 Server Starting At http://localhost:' + port)
})
