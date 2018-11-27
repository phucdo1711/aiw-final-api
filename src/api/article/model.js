import mongoose, {
  Schema
} from 'mongoose'

import Crawler from 'crawler';
import {
  Category
} from '../category'
import {
  Tag
} from '../tag';

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
  time: {
    type: Date,
  },
  source: {
    name: String,
    href: String
  },
  author: {
    type: String,
    trim: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
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
      thumb: this.thumb,
      category: this.category,
      time: this.time,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags

    }

    return full ? {
      ...view,
      content: this.content,
      source: this.source,
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Article', articleSchema)

model.count().then(count => {
  if (count > 200) return;
  var cDetail = new Crawler({
    maxConnections: 1,
    callback: async function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$;
        const title = $('title')
          .text()
          .trim()
        const author = $('span.author').text().trim();
        const desc = $('h2[data-field="sapo"]')
          .text()
          .trim()
        const content = $('div.rightdetail_content')
          .html()
          .trim()
        const thumb = $('meta[property="og:image"]').attr('content');
        var time = $('meta[itemprop="datePublished"]').attr('content');

        const categoryName = $('a.category span[itemprop=name]').text().replace('GameK', '')

        var source = {}
        source.name = $('a.fon9[target="_blank"]').text();
        source.href = $('a.fon9[target="_blank"]').attr('href');

        var tagsNodes = $('div.tagnew h3');

        var tags = []
        tagsNodes.each(async function (i, e) {
          var tagName = $(this).children().attr('title');


          var ts = await Tag.find({
            name: tagName
          });
          var foundTag = ts[0];
          if (!foundTag) foundTag = await Tag.create({
            name: tagName
          });
          tags.push(foundTag._id)
          if (tags.length === tagsNodes.length) {
            console.log(tags)
            Category.find({
              name: categoryName
            }).then(rs => {
              if (rs.length > 0) {
                var cate = rs[0];
                model.create({
                  title,
                  desc,
                  content,
                  thumb,
                  category: cate._id,
                  source,
                  author,
                  time,
                  tags
                })
              } else Category.create({
                name: categoryName
              }).then((cate) => {
                model.create({
                  title,
                  desc,
                  content,
                  thumb,
                  category: cate._id,
                  source,
                  author,
                  time,
                  tags
                })
              })
            })
          }
        })


        // console.log("tags", tags)




        // model.create({title, desc, content, thumb})

      }
      done();
    }
  })

  var c = new Crawler({
    maxConnections: 1,
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$;
        const nodes = $(`li.fade-out`)

        nodes.each(function (i, e) {
          var a = $(this);
          const url = a
            .children()
            .attr('href')

          cDetail.queue(`http://gamek.vn${url}`)
        })

      }
      done();
    }
  });
  
  var arr = [];
  for (let index = 5; index < 10; index++) {
    arr.push(index)
  }

  c.queue(arr.map(e => `http://s.gamek.vn/Ajax/DanhSachTin_Home.aspx?Page=${e}&homeurl=home&listNewsId=2018112716201765%2C20181127160309165%2C20181127101803261%2C20181126131025883`));
})

export const schema = model.schema
export default model;
