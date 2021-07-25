import { Socket } from 'socket.io'

export function ping (socket: Socket) {
  socket.emit('pong', { message: 'handshake complete' })
}
