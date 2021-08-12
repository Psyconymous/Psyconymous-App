import app from './index'
import { Server, Socket } from 'socket.io'
import socketHandlers from './sockets/sockets'
import { User } from '../interfaces'

const port = process.env.PORT || 5000
const io = new Server(app, {
    cors: {
        origin: "http://localhost:8080",
    }
})

const DB : Array<User> = [] 

io.on('connection', (socket: Socket) => {
	socketHandlers(socket, io, DB)
})

app.listen(port, () => {
  console.log('🚀 Server Starting At http://localhost:' + port)
})
