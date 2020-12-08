'use strict';
const Controller = require('egg').Controller;

class piciController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.pici.list({ ...ctx.request.body });
  }
  async create() {
    const ctx = this.ctx;
    const body = { ...ctx.request.body };
    ctx.body = await ctx.service.pici.create(body);
  }
  async detail() {
    this.ctx.body = await this.ctx.service.pici.detail(this.ctx.params.id);
  }
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;

    await this.ctx.service.pici.destroy(id);
    ctx.status = 200;
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;

    const option = { ...ctx.request.body };
    // 需求修改不能修改状态
    delete option.status;
    ctx.body = await ctx.service.pici.update(id, option);
  }
  async check() {
    const res = await this.ctx.service.pici.check();
    this.ctx.body = {
      id: res ? res.id : '',
    };
  }
  async execute() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const { step, subStep, metaFile } = ctx.request.body;
    await ctx.service.pici.execute(id, { step, subStep, metaFile });
  }
  async stopExecute() {
    await this.ctx.service.pici.stopExecute(this.ctx.params.id);
  }
}
module.exports = piciController;
