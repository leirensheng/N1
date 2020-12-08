'use strict';
// 批次处理开始时间（生成），批次处理完成时间（生成），当前处理进度（状态位，记录当前处理到第几个步骤）,批次状态（状态位，0未开始，1运行中，2已完成，3挂起，4废止）
module.exports = app => {
  const tableName = 'data_process_rule';
  const { STRING, DATE, INTEGER, TINYINT, BIGINT } = app.Sequelize;

  const Rule = app.model1.define(
    'Rule',
    {
      id: { type: BIGINT(0), primaryKey: true },
      no: { type: INTEGER(0), comment: '规则唯一标识号' },
      ruleName: { type: STRING(50), comment: '规则名称' },
      type: { type: TINYINT(1), comment: '规则类型：0-未分类；1-数据项映射；2-数据值映射;3-数据清洗' },
      objectName: { type: STRING(255), comment: '处理对象名称' },
      objectValue: { type: STRING(255), comment: '处理对象值' },
      handlingSituation: {
        type: STRING(255),
        comment: '处理情形',

      },
      handlingClass: { type: STRING(255), comment: '处理类' },
      handlingMethod: { type: STRING(255), comment: '处理函数' },
      fixedOutputValue: {
        type: STRING(255),
        comment: '固定输出值',
      },
      targetPosition: {
        type: TINYINT(1),
        comment: '目标对象存储位置：1-MYSQL,2-MANGODB,3-ELASTIC_SEARCH,4-HIVE/HADOOP',
      },
      targetSchema: {
        type: STRING(255),
        comment: '目标对象存储shcema',
      },
      targetTable: {
        type: STRING(255),
        comment: '目标对象存储table',
      },
      targetColumn: {
        type: STRING(255),
        comment: '目标对象存储column',
      },
      handlingDescription: {
        type: STRING(255),
        comment: '处理说明',
      },
      createTime: { type: DATE, comment: '创建时间' },
      creator: { type: STRING(100), comment: '创建人' },
      doubtTypeId: { type: BIGINT(0), comment: '关联质疑类型的id' },
      status: { type: TINYINT(1), comment: '规则状态：0-待审核（新建）；1-启用；2-停用' },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      tableName,
    });


  Rule.associate = function() {
    // 与Classes存在多对一关系，所以使用belongsTo()
    app.model1.Rule.hasMany(app.model1.Doubt, { foreignKey: 'rule_id', targetKey: 'id' });
  };


  return Rule;
};

