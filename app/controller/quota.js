'use strict';
const Controller = require('egg').Controller;

class quotaController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.quota.list({ ...ctx.request.body });
  }
  async update() {
    const ctx = this.ctx;
    const { _id } = ctx.request.body;
    const message = await ctx.service.quota.update(_id, { ...ctx.request.body });
    if (message) {
      ctx.body = {
        code: -1,
        message,
      };
    }
  }
}

module.exports = quotaController;
