import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Category, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /categories Create category
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiParam name Category's name.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.post('/',
  body({ name }),
  create)

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Category
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of categories.
 * @apiSuccess {Object[]} rows List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /categories/:id Retrieve category
 * @apiName RetrieveCategory
 * @apiGroup Category
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /categories/:id Update category
 * @apiName UpdateCategory
 * @apiGroup Category
 * @apiParam name Category's name.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.put('/:id',
  body({ name }),
  update)

/**
 * @api {delete} /categories/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 */
router.delete('/:id',
  destroy)

export default router
