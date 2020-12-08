'use strict';
const Controller = require('egg').Controller;

class categoryCompareController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.categoryCompare.list({ ...ctx.request.body });
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const data = ctx.request.body;
    await ctx.service.categoryCompare.update(id, data);

  }
}
module.exports = categoryCompareController;
