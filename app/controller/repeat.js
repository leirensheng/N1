'use strict';
const Controller = require('egg').Controller;

class repeatController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.repeat.list({ ...ctx.request.body });
  }
}
module.exports = repeatController;
