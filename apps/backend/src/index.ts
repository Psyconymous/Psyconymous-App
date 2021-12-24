import app from './server'
import { Server, Socket } from 'socket.io'
import socketHandlers from './sockets/sockets'
import { User } from './interfaces'
import memoryStorage from './sockets/sessionStorage'
import clustering from './clusters/clusters'

const port = process.env.PORT || 5000
const io = new Server(app, {
    cors: {
        origin: "http://localhost:8080",
    }
})

const DB : Array<User> = [] 
const sessionDB = new memoryStorage()

io.use((socket: Socket, next: any) => {
  socketHandlers.middleware(socket, next, sessionDB)
})

io.on('connection', (socket: Socket) => {
	socketHandlers.main(socket, io, DB, sessionDB)
})

if (process.env.NODE_ENV === 'production') {
  console.log('Production Server Online')
  clustering(() => {
    app.listen(port, () => {
      console.log('🚀 Server Starting At http://localhost:' + port)
    })
  })
} else {
  console.log('Development Server Online')
  app.listen(port, () => {
    console.log('🚀 Server Starting At http://localhost:' + port)
  })
}

