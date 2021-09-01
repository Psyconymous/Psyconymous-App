import express, { Request, Response } from 'express'
import http from 'http'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/ping', (_: Request, res: Response) => {
  res.status(200).json({ message: 'pong' })
})

const server = http.createServer(app)

export default server
