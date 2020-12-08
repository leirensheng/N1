'use strict';
const Controller = require('egg').Controller;

class categoryController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.category.list({ ...ctx.request.body });
  }
  async all() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.category.all();
  }
}
module.exports = categoryController;
