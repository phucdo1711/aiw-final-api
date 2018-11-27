import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Comment, { schema } from './model'

const router = new Router()
const { name, email, content, article } = schema.tree

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiParam name Comment's name.
 * @apiParam email Comment's email.
 * @apiParam content Comment's content.
 * @apiParam article Comment's article.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 */
router.post('/',
  body({ name, email, content, article }),
  create)

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comment
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of comments.
 * @apiSuccess {Object[]} rows List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    article
  }),
  index)

/**
 * @api {get} /comments/:id Retrieve comment
 * @apiName RetrieveComment
 * @apiGroup Comment
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /comments/:id Update comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiParam name Comment's name.
 * @apiParam email Comment's email.
 * @apiParam content Comment's content.
 * @apiParam article Comment's article.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 */
router.put('/:id',
  body({ name, email, content, article }),
  update)

/**
 * @api {delete} /comments/:id Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comment not found.
 */
router.delete('/:id',
  destroy)

export default router
