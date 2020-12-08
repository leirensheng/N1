'use strict';
// 批次处理开始时间（生成），批次处理完成时间（生成），当前处理进度（状态位，记录当前处理到第几个步骤）,批次状态（状态位，0未开始，1运行中，2已完成，3挂起，4废止）
module.exports = app => {
  const tableName = 'doubt_data';
  const { STRING, BIGINT, DATE, TINYINT } = app.Sequelize;

  const Doubt = app.model1.define(
    'Doubt',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      metaRelId: { type: BIGINT(19) },
      ruleId: { type: BIGINT(19) },
      doubtTypeId: { type: BIGINT(19) },
      doubtTime: { type: DATE },
      fieldName: {
        type: STRING(50),
      },
      alias: {
        type: STRING(50),
      },
      fixMethod: {
        type: STRING(255),
      },
      fixDescription: {
        type: STRING(255),
      },
      memo: {
        type: STRING(1000),
      },
      status: {
        type: TINYINT(4),
        comment: '质疑数据状态：0-待处理；1-处理中；2-已完成',
      } },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });
  Doubt.associate = function() {
    // 与Classes存在多对一关系，所以使用belongsTo()
    app.model1.Doubt.belongsTo(app.model1.Rule, { foreignKey: 'rule_id', targetKey: 'id' });
  };

  return Doubt;
};
