import app from './index'
import { Server } from 'socket.io'
import { main } from './sockets/index'

const port = process.env.PORT || 5000
const io = new Server(app)

io.on('connection', main)

app.listen(port, () => {
  console.log('🚀 Server Starting At http://localhost:' + port)
})
