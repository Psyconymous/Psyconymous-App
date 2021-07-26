import { Socket } from 'socket.io'

export function main (socket: Socket) {
  console.log('user connected')
  socket.on('ping', () => {
    socket.emit('pong', { message: 'handshake complete' })
  })
}
