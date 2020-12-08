'use strict';
const Controller = require('egg').Controller;

class inspectionController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.inspection.list({ ...ctx.request.body });
  }
}
module.exports = inspectionController;
