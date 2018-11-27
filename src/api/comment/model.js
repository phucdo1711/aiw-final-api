import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

commentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
      content: this.content,
      article: this.article,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
