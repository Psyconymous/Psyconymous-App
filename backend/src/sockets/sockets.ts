import { Socket } from 'socket.io'

function main(socket: Socket, io: any) {
	// ping
	socket.on('ping', () => {
		socket.emit('pong', { message: 'handshake complete' })
	})

	// in memory store of users
	const users : Array<any> = []

	// gives the new user the list of users online
	for (const [id, socket] of io.of('/').sockets) {
		users.push({
			userId: id
		})
		socket.emit('users', users)
	}

	// get all users active
	socket.on('users', () => {
		io.emit('users', users)
	})

	// notifies other users that a new user poppd up and give them then id of the new user
	socket.broadcast.emit('user connected', {
		userID: socket.id
	})

	// private messages, recieve and sent out to a specific user that is online
	socket.on('private message', ({ content, to }) => {
		socket.to(to).emit('private message', {
			content,
			from: socket.id
		})
	})

}

export default main
