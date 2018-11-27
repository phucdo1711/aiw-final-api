import { success, notFound } from '../../services/response/'
import { Tag } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tag.create(body)
    .then((tag) => tag.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tag.count(query)
    .then(count => Tag.find(query, select, cursor)
      .then((tags) => ({
        count,
        rows: tags.map((tag) => tag.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tag.findById(params.id)
    .then(notFound(res))
    .then((tag) => tag ? tag.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tag.findById(params.id)
    .then(notFound(res))
    .then((tag) => tag ? Object.assign(tag, body).save() : null)
    .then((tag) => tag ? tag.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tag.findById(params.id)
    .then(notFound(res))
    .then((tag) => tag ? tag.remove() : null)
    .then(success(res, 204))
    .catch(next)
