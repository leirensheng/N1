'use strict';
const Controller = require('egg').Controller;

class mapRuleController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.mapRule.list({ ...ctx.request.body });
  }
  async create() {
    const ctx = this.ctx;
    const body = { ...ctx.request.body };
    ctx.body = await ctx.service.mapRule.create(body);
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    await this.ctx.service.mapRule.destroy(id);
    ctx.status = 200;
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;

    const option = { ...ctx.request.body };
    ctx.body = await ctx.service.mapRule.update(id, option);
  }

}
module.exports = mapRuleController;
