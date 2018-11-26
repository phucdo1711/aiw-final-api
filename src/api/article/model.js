import mongoose, {
  Schema
} from 'mongoose'

import Crawler from 'crawler';
import { Category } from '../category'

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true
  },
  desc: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  thumb: {
    type: String,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category',
  }, 
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

articleSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      desc: this.desc,
      content: this.content,
      thumb: this.thumb,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Article', articleSchema)

// model.count().then(count => {
//   if (count > 150) return;
//   var cDetail = new Crawler({
//     maxConnections: 1,
//     callback: function (error, res, done) {
//       if (error) {
//         console.log(error);
//       } else {
//         var $ = res.$;
//         const title = $('h1.kbwc-title')
//           .text()
//           .trim()
//         const desc = $('h2.knc-sapo')
//           .text()
//           .trim()
//         const content = $('div.knc-content')
//           .html()
//           .trim()
//         const thumb = $('meta[property="og:image"]').attr('content');

//         const categoryName = $('li.active span[itemprop=name]').text()
//         Category.find({name: categoryName}).then(rs => {
//           if(rs.length > 0) {
//             var cate = rs[0];
//             model.create({title, desc,content, thumb,category: cate._id })
//           }
//           else Category.create({name: categoryName}).then((cate) => {
//             model.create({title, desc,content, thumb,category: cate._id })
//           })
//         })
//         // model.create({title, desc, content, thumb})
      
//       }
//       done();
//     }
//   })

//   var c = new Crawler({
//     maxConnections: 1,
//     callback: function (error, res, done) {
//       if (error) {
//         console.log(error);
//       } else {
//         var $ = res.$;
//         const nodes = $("h4.knswli-title")

//         nodes.each(function (i, e) {

//           const cNew = {
//             title: "",
//             url: "",
//             desc: "",
//             content: ""
//           }
//           var a = $(this);
//           cNew.url = a
//             .children()
//             .attr('href')
//           cNew.title = a.text()
//           // if (i === 0)
//           cDetail.queue(`http://genk.vn${cNew.url}`)
//         })

//       }
//       done();
//     }
//   });

//   c.queue([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,].map(e =>`http://genk.vn/ajax-home/page-${e}/20181126155940611__2018112522505872__20181126111034876__20181126121146205__20181126082715501.chn`));
// })

export const schema = model.schema
export default model;
