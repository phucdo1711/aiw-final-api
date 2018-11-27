import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Comment } from '.'

const app = () => express(apiRoot, routes)

let comment

beforeEach(async () => {
  comment = await Comment.create({})
})

test('POST /comments 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', email: 'test', content: 'test', article: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.article).toEqual('test')
})

test('GET /comments 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /comments/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${comment.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(comment.id)
})

test('GET /comments/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /comments/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${comment.id}`)
    .send({ name: 'test', email: 'test', content: 'test', article: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(comment.id)
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.article).toEqual('test')
})

test('PUT /comments/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', email: 'test', content: 'test', article: 'test' })
  expect(status).toBe(404)
})

test('DELETE /comments/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${comment.id}`)
  expect(status).toBe(204)
})

test('DELETE /comments/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
