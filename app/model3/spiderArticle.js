'use strict';
// 批次处理开始时间（生成），批次处理完成时间（生成），当前处理进度（状态位，记录当前处理到第几个步骤）,批次状态（状态位，0未开始，1运行中，2已完成，3挂起，4废止）
module.exports = app => {
  const tableName = 'spider_article_list';
  const { STRING, DATE, TINYINT } = app.Sequelize;

  const SpiderArticle = app.model3.define(
    'SpiderArticle',
    {
      id: { type: STRING, comment: 'id','primaryKey':true },
      date: { type: DATE, comment: '发布日期' },
      title: { type: STRING(255), comment: '文章标题' },
      url: { type: STRING(800), comment: '文章地址' },
      src: { type: STRING(800), comment: '数据来源spider_channel_id' },
      classify: { type: STRING(255), comment: '文章类型' },
      organizationId: { type: STRING, comment: '发布机构id', field: 'organization_id' },
      status: { type: TINYINT, comment: '状态:1正常，0废弃' },
      memo: { type: STRING(255), comment: '备注' }
    } ,
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: false,
      updatedAt: false,
      tableName,
    });

  return SpiderArticle;
};
