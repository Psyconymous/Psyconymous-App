import { User, dynamicSocket } from '../interfaces'
import crypto from 'crypto'

function randomID () {
  return crypto.randomBytes(8).toString('hex')
}

function middleware (socket: dynamicSocket, next: any, sessionDB: any) {
  const sessionID = socket.handshake.auth.sessionID

  // if sessionID exists, then reuse session
  if (sessionID) {
    const session = sessionDB.findSession(sessionID)
    if (session) {
      socket.sessionID = sessionID
      socket.userID = session.userID
      return next()
    }
  }

  // adding username support
  socket.sessionID = randomID()
  socket.userID = randomID()
  next()
}

function main (socket: dynamicSocket, io: any, db: Array<User>, sessionDB: any) {
  // persist session
  sessionDB.saveSession(socket.sessionID, {
    userID: socket.userID
  })

  socket.join(socket.userID!)

  // send socket details
  socket.on('request session', () => {
    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID
    })
  })

  // attempt to match user with other users
  socket.on('match', ({ username }) => {
    if (db.length === 1) {
      if (socket.userID === db[0].userId) {
        return
      }
      // send to matched users
      // remove first index from memory DB
      io.in(socket.userID).emit('matched', { to: socket.userID, matchedUser: db[0].userId, matchedUsername: db[0].username })
      io.in(db[0].userId).emit('matched', { to: db[0].userId, matchedUser: socket.userID, matchedUsername: username })
      db.splice(0, 1)
    } else if (db.length > 1) {
      // random number gen and match with one of the users
      // inform the matched users and remove from in memory db
      const random = Math.floor(Math.random() * ((db.length - 1) - 0 + 1) + 0)
      if (socket.userID === db[random].userId) {
        return
      }
      io.in(socket.userID).emit('matched', { to: socket.userID, matchedUser: db[random].userId, matchedUsername: db[random].username })
      io.in(db[random].userId).emit('matched', { to: db[random].userId, matchedUser: socket.userID, matchedUsername: username })
      db.splice(random, 1)
    } else if (db.length === 0) {
      // add user to waiting list and inform them
      const waitingUser = { userId: socket.userID!, username }
      if (db.indexOf(waitingUser) !== -1) {
        return
      }
      db.push(waitingUser)
      io.in(socket.id).emit('not_matched', { message: 'please wait' })
    }
  })

  // ping
  socket.on('ping', () => {
    io.in(socket.userID).emit('pong', { message: 'handshake complete' })
  })

  // private messages, recieve and sent out to a specific user that is online
  socket.on('private message', ({ content, username, to }) => {
    socket.to(to).to(socket.userID!).emit('private message', {
      content,
      username,
      from: socket.userID
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
  // // disconnect handler
  // socket.on('disconnect', () => {
  //   sessionDB.deleteSession(socket.sessionID)
  // })
}

export default { main, middleware }
