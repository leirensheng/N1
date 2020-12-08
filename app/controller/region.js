'use strict';
const Controller = require('egg').Controller;

class regionController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.region.list({ ...ctx.request.body });
  }
}
module.exports = regionController;
