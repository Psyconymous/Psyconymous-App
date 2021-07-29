import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'

interface pingArgs {
  message: string
}
interface User {
  userId: string
}

describe('Ping Sockets', () => {
  // initialisation
  const socketServer = new Server(app)
  const clientServer = Client('http://localhost:5000')

  beforeAll((done: any) => {
    app.listen(5000, () => { })
    socketServer.on('connect', (socket: Socket) => {
      // ping
      socket.on('ping', () => {
        socket.emit('pong', { message: 'handshake complete' })
      })

      // in memory store of users
      const users : Array<User> = []

      // gives the new user the list of users online
      for (const [id, socket] of socketServer.of('/').sockets) {
        users.push({
          userId: id
        })
        socket.emit('users', users)
      }

      // get all users active
      socket.on('users', () => {
        socketServer.emit('users', users)
      })

      // notifies other users that a new user poppd up and give them then id of the new user
      socket.broadcast.emit('user connected', {
        userID: socket.id
      })

      // private messages, recieve and sent out to a specific user that is online
      socket.on('private message', ({ content, to } : any) => {
        socket.to(to).emit('private message', {
          content,
          from: socket.id
        })
      })
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

  // in memory userbase test
  test('when connected, it should return a list of users', (done: any) => {
    clientServer.emit('users', '')
    clientServer.on('users', (users: Array<User>) => {
      expect(users.length).toBe(1)
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
