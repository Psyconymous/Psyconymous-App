import request from 'supertest'
import app from '../src/index'

// testing if express works
describe('Ping Server', () => {
  test('it should return Pong', async (done : any) => {
    const res = await request(app).get('/ping')
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('pong')
    done()
  })
})
