import app from '../src/index'
import { Server } from 'socket.io'
import Client from 'socket.io-client'
import { main } from '../src/sockets/index'

interface pingArgs {
  message: string
}

describe('Ping Sockets', () => {
  // initialisation
  const socketServer = new Server(app)
  const clientServer = Client('http://localhost:5000')

  test('it should return Pong', (done : any) => {
    app.listen(5000, () => {})
    socketServer.on('connect', main)

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
