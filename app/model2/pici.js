'use strict';
// 批次处理开始时间（生成），批次处理完成时间（生成），当前处理进度（状态位，记录当前处理到第几个步骤）,批次状态（状态位，0未开始，1运行中，2已完成，3挂起，4废止）
module.exports = app => {
  const tableName = 'batch';
  const { STRING, DATE, TINYINT } = app.Sequelize;

  const Material = app.model2.define(
    'Pici',
    {
      /* 通用字段 */
      id: { type: STRING(19), primaryKey: true },
      name: { type: STRING(64) },
      createdAt: { type: DATE },
      updatedAt: { type: DATE },
      startTime: { type: DATE },
      endTime: { type: DATE },
      progress: {
        type: STRING(255),
        field: 'progress',
        comment: '处理进度',
      },
      step: {
        type: TINYINT(4),
        field: 'step',
        comment: '处理步骤',
      },
      hasDoneStep: {
        type: STRING(255),
        field: 'has_done_step',
        comment: '处理步骤',
      },
      subStep: {
        type: TINYINT(4),
        comment: '处理子步骤',
      },
      version: {
        type: STRING(255),
      },
      status: {
        type: TINYINT(4),
        comment: '状态（0未开始，1运行中，2已完成，3废止）',
      } },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName,
    });

  return Material;
};
