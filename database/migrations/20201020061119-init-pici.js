'use strict';
const name = 'batch';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, TINYINT } = Sequelize;
    return await queryInterface.createTable(name, {
      id: { type: STRING(19), primaryKey: true },
      name: STRING(64),
      start_time: DATE,
      end_time: DATE,
      progress: {
        type: STRING(255),
        comment: '处理进度',
      },
      step: {
        type: TINYINT(4),
        comment: '处理步骤',
      },
      sub_step: {
        type: TINYINT(4),
        comment: '处理子步骤',
      },
      status: {
        type: TINYINT(4),
        comment: '状态（0未开始，1运行中，2已完成，3废止）',
      },
      updated_at: DATE,
      created_at: DATE,
    }, {
      comment: '批次管理表',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(name);
  },
};
