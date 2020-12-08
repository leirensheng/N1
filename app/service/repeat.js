'use strict';
const Service = require('egg').Service;
 
class repeatService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'data_id', 'desc' ]];

    const res = await this.ctx.model1.Repeat.findAndCountAll({
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
}
module.exports = repeatService;
