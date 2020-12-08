'use strict';
module.exports = app => {
  const tableName = 'aux_execute_result'; const { STRING, TINYINT, BIGINT } = app.Sequelize;

  const Region = app.model1.define(
    'Result',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      current: { type: TINYINT(4) },
      step: { type: TINYINT(4) },
      dataId: { type: BIGINT(19) },
      memo: { type: STRING(10000) },
    },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Region;
};
