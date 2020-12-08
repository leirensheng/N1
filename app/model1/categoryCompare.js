'use strict';
module.exports = app => {
  const tableName = 'aux_category_compare'; const { DECIMAL, BIGINT, STRING } = app.Sequelize;

  const Category = app.model1.define(
    'CategoryCompare',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      product: { type: STRING(64) },
      pcpCategoryId: { type: BIGINT(19) },
      pcpCategoryName: { type: STRING(128) },
      pcpProb: {
        type: DECIMAL(10),
      },
      cnnCategoryId: { type: BIGINT(19) },
      cnnCategoryName: { type: STRING(128) },
      cnnProb: {
        type: DECIMAL(10),
      },
      manual: { type: STRING(64) },
      manualCategoryId: { type: BIGINT(19) },
    },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Category;
};
