'use strict';
const Service = require('egg').Service;

class categoryService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'id', 'desc' ]];

    const res = await this.ctx.model3.Category.findAndCountAll({
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

  all() {
    return this.ctx.model3.Category.findAll({
      where: {
        themeId: '1283675984687697922',
      },
    });
  }
}
module.exports = categoryService;
