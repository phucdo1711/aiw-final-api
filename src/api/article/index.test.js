import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Article } from '.'

const app = () => express(apiRoot, routes)

let article

beforeEach(async () => {
  article = await Article.create({})
})

test('POST /articles 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', desc: 'test', content: 'test', thumb: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.thumb).toEqual('test')
  expect(body.category).toEqual('test')
})

test('GET /articles 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${article.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
})

test('GET /articles/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${article.id}`)
    .send({ title: 'test', desc: 'test', content: 'test', thumb: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
  expect(body.title).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.thumb).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /articles/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', desc: 'test', content: 'test', thumb: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /articles/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
  expect(status).toBe(204)
})

test('DELETE /articles/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
