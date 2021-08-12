import app from '../src/index'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import socketHandler from '../src/sockets/sockets'
import clientServerTwo from './matching-client'

interface User {
	userId: string
}

describe('chat system', () => {
  // initialisation
  let socketServer : any
  let clientServerOne = Client('http://localhost:5015')

  beforeAll((done: any) => {
    app.listen(5015, () => { })
    socketServer = new Server(app)

    const DB : Array<User> = [] 

    socketServer.on('connect', (socket: Socket) => {
  	socketHandler(socket, socketServer, DB)  
    })

    done()
  })

   test('matching system should return id of other client', (done: any) => {
  	clientServerOne.emit('match', '')
	clientServerTwo.emit('match', '')
  	clientServerOne.on('matched', (args: any) => {
		expect(args.to).toBe(clientServerOne.id)
		expect(args.matchedUser).toBe(clientServerTwo.id)
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
