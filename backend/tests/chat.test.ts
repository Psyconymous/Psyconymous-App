import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import second from './client'
import socketHandler from '../src/sockets/sockets'

interface User {
	userId: string
}

describe('chat system', () => {
  // initialisation
  let socketServer : any
  const clientServerOne = Client('http://localhost:5000')
  const clientServerTwo = second

  beforeAll((done: any) => {
    jest.setTimeout(3000)
    app.listen(5000, () => { })
    socketServer = new Server(app)

    socketServer.on('connect', (socket: Socket) => {
  	socketHandler(socket, socketServer)  
    })

    done()
  })

  test('private message should work', (done: any) => {
    let target
    clientServerOne.emit('users', '')
    clientServerOne.on('users', (users: Array<User>) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId !== clientServerOne.id) {
          target = users[i].userId
          clientServerOne.emit('private message', { content: 'Hi', to: target })
          clientServerTwo.on('private message', ({ content }) => {
            expect(content).toBe('Hi')
            done()
          })
        }
      }
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
