'use strict';
const Controller = require('egg').Controller;

class resultController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.result.list({ ...ctx.request.body });
  }
}
module.exports = resultController;
