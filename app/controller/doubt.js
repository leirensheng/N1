'use strict';
const Controller = require('egg').Controller;

class doubtController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.doubt.list({ ...ctx.request.body });
  }
}
module.exports = doubtController;
