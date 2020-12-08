'use strict';

module.exports = app => {
  const tableName = 'aux_addon_map';
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const MapRule = app.model2.define(
    'MapRule',
    {
      /* 通用字段 */
      id: { type: INTEGER(10), primaryKey: true, autoIncrement: true  },
      tag: { type: STRING(1000) },

      method: {
        type: TINYINT(4),
      },
      column: { type: STRING(50) },
      memo: { type: STRING(500) },

      },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: false,
      updatedAt: false,
      tableName,
    });

  return MapRule;
};
