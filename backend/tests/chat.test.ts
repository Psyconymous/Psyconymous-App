import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import second from './client'
import socketHandler from '../src/sockets/sockets'
import MemoryStorage from '../src/sockets/sessionStorage'

interface User {
  userId: string
}

describe('chat system', () => {
  // initialisation
  let socketServer : any
  const clientServerOne = Client('http://localhost:5005')
  const clientServerTwo = second

  beforeAll((done: any) => {
    app.listen(5005, () => { })
    socketServer = new Server(app)

    const DB : Array<User> = []
    const sessionDB = new MemoryStorage()

    socketServer.use((socket: Socket, next: any) => {
      socketHandler.middleware(socket, next, sessionDB)
    })

    socketServer.on('connect', (socket: Socket) => {
      socketHandler.main(socket, socketServer, DB, sessionDB)
    })

    done()
  })

  test('private message should work', (done: any) => {
    clientServerOne.emit('match', '')
    clientServerTwo.emit('match', '')

    clientServerOne.on('matched', (res:any) => {
      const message = 'hi'
      clientServerOne.emit('private message', { to: res.matchedUser, content: message })
      clientServerTwo.on('private message', (res:any) => {
        expect(res.content).toBe(message)
        done()
      })
    })
  })

  afterAll((done: any) => {
    socketServer.close()
    clientServerOne.close()
    clientServerTwo.close()
    app.close()
    done()
  })
})
