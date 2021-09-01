import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import socketHandler from '../src/sockets/sockets'
import memoryStorage from '../src/sockets/sessionStorage'

interface pingArgs {
  message: string
}
interface User {
  userId: string
}

describe('Ping Sockets', () => {
  // initialisation
  const socketServer = new Server(app)
  const clientServer = Client('http://localhost:5010')

  beforeAll((done: any) => {
    app.listen(5010, () => { })

    const DB : Array<User> = []
    const sessionDB = new memoryStorage()

    socketServer.use((socket: Socket, next: any) => {
      socketHandler.middleware(socket, next, sessionDB)
    })

    socketServer.on('connect', (socket: Socket) => {
    	socketHandler.main(socket, socketServer, DB, sessionDB)
    })
    
    done()
  })
  // ping test
  test('it should return Pong', (done : any) => {
    clientServer.emit('ping', 'test')

    clientServer.on('pong', async (args: pingArgs) => {
      expect(args.message).toBe('handshake complete')
      done()
    })
  })

  afterAll((done: any) => {
    socketServer.close()
    clientServer.close()
    app.close()
    done()
  })
})
