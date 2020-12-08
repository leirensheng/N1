'use strict';
const Service = require('egg').Service;
const Op = require('sequelize').Op;

const mockUtils = require('../extend/utils/mockUtils');
class spiderArticleService extends Service {
  async discard(body) {
    let {title,memo} = body
    let item =  await this.ctx.model3.SpiderArticle.findOne({
      where:{
        title:{[Op.like]:
        `%${title}%`
      }}
    })
    await item.update({
      status:0,
      memo
    })
  }
}

module.exports = spiderArticleService;
