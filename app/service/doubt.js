'use strict';
const Service = require('egg').Service;

class doubtService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'doubt_time', 'desc' ]];

    const index = queryItems.findIndex(one => one.column === 'type');
    const type = queryItems[index].value;
    queryItems.splice(index, 1);
    const res = await this.ctx.model1.Doubt.findAndCountAll({
      where: this.ctx.helper.getWhere(queryItems),
      limit: size,
      offset: size * (page - 1),
      order: defaultOrder,
      include: {
        model: this.ctx.model1.Rule,
        where: {
          type,
        },
        attributes: [ 'type', 'id' ],
      },
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
module.exports = doubtService;
