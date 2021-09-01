import { Socket } from 'socket.io'

export interface User {
	userId: string
}

export interface dynamicSocket extends Socket {
  sessionID? : string
  userID? : string
}
