'use strict';
const Controller = require('egg').Controller;
class spiderArticleController extends Controller {
  async discard() {
    const ctx = this.ctx;
    await this.ctx.service.spiderArticle.discard(ctx.request.body);
  }

}
module.exports = spiderArticleController;
