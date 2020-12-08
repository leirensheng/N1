'use strict';
module.exports = app => {
  const tableName = 'cg_failed_item_rel'; const { BIGINT, STRING, TINYINT } = app.Sequelize;

  const Fail = app.model1.define(
    'Fail',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      inspectionId: { type: BIGINT(19) },
      categoryId: { type: BIGINT(19) },
      fisId: { type: BIGINT(19) },
      standardValue: { type: STRING(1000) },
      testValue: { type: STRING(1000) },
      result: { type: TINYINT(4), comment: '抽检结果：1合格；2不合格' },
      resultExp: { type: STRING(500) },
    },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Fail;
};
