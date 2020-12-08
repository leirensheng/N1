'use strict';
const Controller = require('egg').Controller;

class failController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.fail.list({ ...ctx.request.body });
  }
}
module.exports = failController;
