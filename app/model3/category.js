'use strict';
module.exports = app => {
  const tableName = 'cg_category'; const { STRING, BIGINT } = app.Sequelize;

  const Category = app.model1.define(
    'Category',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      nodeName: { type: STRING(19) },
      themeId: { type: STRING(19) },
    },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Category;
};
