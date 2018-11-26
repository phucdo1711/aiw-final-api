import { Article } from '.'

let article

beforeEach(async () => {
  article = await Article.create({ title: 'test', desc: 'test', content: 'test', thumb: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = article.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(view.title).toBe(article.title)
    expect(view.desc).toBe(article.desc)
    expect(view.content).toBe(article.content)
    expect(view.thumb).toBe(article.thumb)
    expect(view.category).toBe(article.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = article.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(view.title).toBe(article.title)
    expect(view.desc).toBe(article.desc)
    expect(view.content).toBe(article.content)
    expect(view.thumb).toBe(article.thumb)
    expect(view.category).toBe(article.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
