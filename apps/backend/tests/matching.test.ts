import app from '../src/server'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import socketHandler from '../src/sockets/sockets'
import clientServerTwo from './matching-client'
import MemoryStorage from '../src/sockets/sessionStorage'

interface User {
  userId: string
  username: string
}

describe('chat system', () => {
  // initialisation
  let socketServer : any
  let clientServerOne = Client('http://localhost:5015')

  beforeAll((done: any) => {
    app.listen(5015, () => { })
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

  test('matching system should return id of other client', (done: any) => {
    let target: string
    let to: string

    clientServerOne.emit('request session', '')
    clientServerTwo.emit('request session', '')

    clientServerOne.on('session', (res:any) => {
      to = res.userID
    })

    clientServerTwo.on('session', (res:any) => {
      target = res.userID
    })

    clientServerOne.emit('match', { username: 'dog' })
    clientServerTwo.emit('match', { username: 'cat' })

    clientServerOne.on('matched', (res:any) => {
      expect(res.to).toBe(to)
      expect(res.matchedUser).toBe(target)
      expect(res.matchedUsername).toBe('cat')
      done()
    })
  })

  test('matching system should tell the user to wait', (done: any) => {
    clientServerOne = Client('http://localhost:5015')
    clientServerOne.emit('match', '')
    clientServerOne.on('not_matched', (args : any) => {
      expect(args.message).toBe('please wait')
      done()
    })
  })

  afterAll((done: any) => {
    socketServer.close()
    clientServerOne.close()
    app.close()
    done()
  })
})
