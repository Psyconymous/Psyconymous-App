import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import socketHandler from '../src/sockets/sockets'

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
    jest.setTimeout(2000);
    app.listen(5000, () => { })
    socketServer.on('connect', (socket: Socket) => {
    	socketHandler(socket, socketServer)
	done()
    })
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
