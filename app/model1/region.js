'use strict';
module.exports = app => {
  const tableName = 'aux_enterprise_region'; const { STRING, BIGINT } = app.Sequelize;

  const Region = app.model1.define(
    'Region',
    {
      /* 通用字段 */
      id: { type: BIGINT(19), primaryKey: true },
      entName: { type: STRING(500) },
      entAddress: { type: STRING(1000) },
      regProvince: { type: STRING(10) },
      regCity: { type: STRING(10) },
      regDistrict: { type: STRING(10) },
      regStreet: { type: STRING(10) } },
    {
      freezeTableName: true,
      tableName,
      createdAt: false,
      updatedAt: false,
    });

  return Region;
};
