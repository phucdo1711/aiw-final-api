import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Article, { schema } from './model'

const router = new Router()
const { title, desc, content, thumb, category , tags} = schema.tree

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiParam title Article's title.
 * @apiParam desc Article's desc.
 * @apiParam content Article's content.
 * @apiParam thumb Article's thumb.
 * @apiParam category Article's category.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.post('/',
  body({ title, desc, content, thumb, category }),
  create)

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of articles.
 * @apiSuccess {Object[]} rows List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    category, 
    tags
  }),
  index)

/**
 * @api {get} /articles/:id Retrieve article
 * @apiName RetrieveArticle
 * @apiGroup Article
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiParam title Article's title.
 * @apiParam desc Article's desc.
 * @apiParam content Article's content.
 * @apiParam thumb Article's thumb.
 * @apiParam category Article's category.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.put('/:id',
  body({ title, desc, content, thumb, category }),
  update)

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 */
router.delete('/:id',
  destroy)

export default router
