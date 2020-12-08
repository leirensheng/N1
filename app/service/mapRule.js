'use strict';
const Service = require('egg').Service;

class mapRuleService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'id', 'desc' ]];
    const res = await this.ctx.model2.MapRule.findAndCountAll({
      where: this.ctx.helper.getWhere(queryItems),
      limit: size,
      offset: size * (page - 1),
      order: defaultOrder,
    });

    const records = res.rows;

    return {
      records,
      page,
      size,
      total: res.count,
    };
  }

  async create(body) {
    const option = {
      status: 0,
      step: 0,
      progress: '0/0',
      ...body,
    };
    return await this.ctx.model2.MapRule.create(option);
  }
  async destroy(id) {
    const mapRule = await this.ctx.model2.MapRule.findByPk(id);
    if (!mapRule) this.ctx.throw(404, 'mapRule not found');
    mapRule.destroy();
  }
 

  async update(id, body) {
    const option = {
      ...body,
    };
    const mapRule = await this.ctx.model2.MapRule.findByPk(id);

    if (!mapRule) this.ctx.throw(404, 'mapRule not found');

    return await mapRule.update({ ...option });
  }

}
module.exports = mapRuleService;
