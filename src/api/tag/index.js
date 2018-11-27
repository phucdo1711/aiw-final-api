import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tag, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /tags Create tag
 * @apiName CreateTag
 * @apiGroup Tag
 * @apiParam name Tag's name.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 */
router.post('/',
  body({ name }),
  create)

/**
 * @api {get} /tags Retrieve tags
 * @apiName RetrieveTags
 * @apiGroup Tag
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tags.
 * @apiSuccess {Object[]} rows List of tags.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tags/:id Retrieve tag
 * @apiName RetrieveTag
 * @apiGroup Tag
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tags/:id Update tag
 * @apiName UpdateTag
 * @apiGroup Tag
 * @apiParam name Tag's name.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 */
router.put('/:id',
  body({ name }),
  update)

/**
 * @api {delete} /tags/:id Delete tag
 * @apiName DeleteTag
 * @apiGroup Tag
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tag not found.
 */
router.delete('/:id',
  destroy)

export default router
