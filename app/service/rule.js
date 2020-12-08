'use strict';
const Service = require('egg').Service;

class ruleService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'create_time', 'desc' ]];

    const res = await this.ctx.model1.Rule.findAndCountAll({
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

  // async listWithDoubt(query) {
  //   const { queryItems, currPage: page, pageSize: size } = query;
  //   const defaultOrder = [[ 'create_time', 'desc' ]];

  //   const res = await this.ctx.model1.Rule.findAndCountAll({
  //     where: this.getWhere(queryItems),
  //     limit: size,
  //     offset: size * (page - 1),
  //     order: defaultOrder,
  // 		include: [
  //       {
  //         model: this.ctx.model1.Doubt,
  //       },
  //     ],
  //   });

  //   const records = res.rows;

  //   return {
  //     records,
  //     page,
  //     size,
  //     total: res.count,
  //   };
  // }
}
module.exports = ruleService;
