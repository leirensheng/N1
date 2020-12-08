'use strict';
// 批次处理开始时间（生成），批次处理完成时间（生成），当前处理进度（状态位，记录当前处理到第几个步骤）,批次状态（状态位，0未开始，1运行中，2已完成，3挂起，4废止）
module.exports = app => {
  const tableName = 'aux_repeat_result';
  const { STRING, BIGINT, INTEGER } = app.Sequelize;

  const Repeat = app.model1.define(
    'Repeat',
    {
      /* 通用字段 */
      dataId: { type: BIGINT(19), primaryKey: true },
      groupId: { type: BIGINT(19) },
      mergedId: { type: BIGINT(19) },
      result: {
        type: INTEGER(10),
      },
      memo: {
        type: STRING(1000),
      } },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Repeat;
};
