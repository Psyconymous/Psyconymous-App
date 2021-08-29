import { Socket } from 'socket.io'
import { User } from '../../interfaces'

function main (socket: Socket, io: any, db: Array<User>) {
  // attempt to match user with other users
  socket.on('match', () => {
    if (db.length === 1) {
      // send to matched users
      // remove first index from memory DB
      io.in(socket.id).emit('matched', { to: socket.id, matchedUser: db[0].userId })
      io.in(db[0].userId).emit('matched', { to: db[0].userId, matchedUser: socket.id })

      db.splice(0, 1)
    } else if (db.length > 1) {
      // random number gen and match with one of the users
      // inform the matched users and remove from in memory db
      const random = Math.floor(Math.random() * ((db.length - 1) - 0 + 1) + 0)

      io.in(socket.id).emit('matched', { to: socket.id, matchedUser: db[random].userId })
      io.in(db[random].userId).emit('matched', { to: db[random].userId, matchedUser: socket.id })

      db.splice(random, 1)
    } else if (db.length === 0) {
      // add user to waiting list and inform them
      db.push({ userId: socket.id })
      io.in(socket.id).emit('not_matched', { message: 'please wait' })
    }
  })

  // ping
  socket.on('ping', () => {
    io.in(socket.id).emit('pong', { message: 'handshake complete' })
  })

  // private messages, recieve and sent out to a specific user that is online
  socket.on('private message', ({ content, to }) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id
    })
  })

  // used for testing
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
    io.in(socket.id).emit('users', users)
  })

  // disconnect
  socket.on('client_disconnect', ({ to }) => {
    io.in(to).emit('client_disconnected', '')
  })

}

export default main
