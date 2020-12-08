'use strict';
const Service = require('egg').Service;
const Op = require('sequelize').Op;

class categoryCompareService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'id', 'desc' ]];

    const res = await this.ctx.model1.CategoryCompare.findAndCountAll({
      where: {
        ...this.ctx.helper.getWhere(queryItems),
        pcpCategoryId: {
          [Op.ne]: this.ctx.app.Sequelize.col('cnn_category_id'),
        },
      },
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

  async update(id, data) {
    const item = await this.ctx.model1.CategoryCompare.findByPk(id);
    if (item) {
      await item.update(data);
    } else {
      this.ctx.throw('没有该id');
    }
  }
}
module.exports = categoryCompareService;
