import { Comment } from '.'

let comment

beforeEach(async () => {
  comment = await Comment.create({ name: 'test', email: 'test', content: 'test', article: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = comment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comment.id)
    expect(view.name).toBe(comment.name)
    expect(view.email).toBe(comment.email)
    expect(view.content).toBe(comment.content)
    expect(view.article).toBe(comment.article)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = comment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comment.id)
    expect(view.name).toBe(comment.name)
    expect(view.email).toBe(comment.email)
    expect(view.content).toBe(comment.content)
    expect(view.article).toBe(comment.article)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
