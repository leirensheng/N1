'use strict';

module.exports = app => {
  const tableName = 'cg_inspection';
  const { STRING, DATE, TINYINT } = app.Sequelize;

  const Inspection = app.model1.define(
    'Inspection',
    {
      /* 通用字段 */
      id: { type: STRING(19), primaryKey: true },
      snapshotId: { type: STRING(19) },
      legalEntityId: { type: STRING(19) },
      batchId: { type: STRING(19) },
      testResult: {
        type: TINYINT(4),
        comment: '1合格，2不合格，3未抽样',
      },
      failedItem: { type: STRING(1000) },
      failedCategoryId: { type: STRING(19) },
      testBasis: { type: STRING(500) },
      standardValue: { type: STRING(500) },
      testValue: { type: STRING(500) },
      testAmount: { type: STRING(255) },
      baseAmount: { type: STRING(255) },
      rank: { type: STRING(50) },
      targetLocation: { type: STRING(200) },
      license: { type: STRING(200) },
      sampleNumber: { type: STRING(64) },
      notificationSerial: { type: STRING(64) },
      questName: { type: STRING(50) },
      stockAmount: { type: STRING(100) },
      approvalNumber: { type: STRING(64) },
      permissionProduce: {
        type: TINYINT(4),
        comment: '是否生产许可',
      },
      testItem: { type: STRING(500) },
      permissionCcc: {
        type: TINYINT(4),
        comment: '是否3C认证：0未确认，1是，2否，9无须',
      },
      administrationId: { type: STRING(19) },
      notificationTitle: { type: STRING(500) },
      notificationDate: { type: DATE },
      targetName: { type: STRING(255) },
      targetAddr: { type: STRING(255) },
      targetPerson: { type: STRING(50) },
      targetTelephone: { type: STRING(100) },
      testDate: { type: STRING(64) },
      reportNo: { type: STRING(100) },
      testEntityId: { type: STRING(19) },
      addon: { type: STRING(3000) },
      brand: { type: STRING(100) },
      dataType: { type: TINYINT(4), comment: '数据类型 1公告采集；2国抽；3省抽' },
      isDuplicated: { type: TINYINT(4), comment: '是否和采集数据重复 0否1是' },
      duplicationId: { type: STRING(19) },
      createTime: { type: DATE },
      createBy: { type: STRING(19) },


    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      tableName,
    });

  return Inspection;
};
