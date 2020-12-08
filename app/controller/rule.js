'use strict';
const Controller = require('egg').Controller;

class ruleController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.rule.list({ ...ctx.request.body });
  }
}
module.exports = ruleController;
