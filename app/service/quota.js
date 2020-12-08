'use strict';
const Service = require('egg').Service;
const { map } = require('../const/quota');

class quotaService extends Service {
  transformJson(arr) {
    return arr.map(oldJson => {
      const json = this.ctx.helper.transformJson(oldJson, map);
      return json;
    });
  }

  async createOrUpdate(arr, piciId) {
    arr.forEach(one => {
      one.attachmentNum = one.attachmentNum === '附件空白' ? 0 : one.attachmentNum;
      one.piciId = piciId;
    });

    await this.ctx.model.Quota.remove({ piciId });

    await this.ctx.model.Quota.create(arr);
  }

  getWhere(queryItems) {
    return queryItems.reduce((prev, cur) => {
      const { column, exp, value } = cur;
      if (value !== '') {
        const val = exp === 'like' ? new RegExp(value, 'i') : value;
        prev[column] = val;
      }
      return prev;
    }, {});
  }


  async update(_id, body) {
    const option = {
      ...body,
    };
    const old = await this.ctx.model.Quota.findOne({ _id });

    if (body.__v === old.__v) {
      body.__v++;
      await old.update(body);
    } else {
      return '该条记录已经被别人修改，请重新查询';
    }
    // console.log(11111,old);

    // if (!pici) this.ctx.throw(404, 'pici not found');

    // return await pici.update({ ...option });
  }

  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const queryParams = this.getWhere(queryItems);
    console.log(queryParams);
    // const defaultOrder = [[ 'created_at', 'desc' ]];

    const total = await this.ctx.model.Quota.find(queryParams).count();

    const records = await this.ctx.model.Quota.find(queryParams).skip((page - 1) * size).limit(size);


    return {
      records,
      page,
      size,
      total,
    };
  }
}
module.exports = quotaService;
