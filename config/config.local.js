'use strict';
const getId = require('../app/extend/utils/getId');

module.exports = () => {
  console.log('>>>>> load config.local.js');
  return {
    maxTask: 5,
    // sequelize: {
    //   datasources: [
    //     {
    //       delegate: 'model2',
    //       baseDir: 'model2',
    //       database: 'test',
    //       host: 'localhost',
    //       port: '3306',
    //       username: 'root',
    //       dialect: 'mysql',
    //       timezone: '+08:00',
    //       define: {
    //         hooks: {
    //           beforeCreate: instance => {
    //             if (!instance.id) {
    //               instance.id = getId();
    //             }
    //           },
    //         },
    //       },
    //     },
    //     {
    //       delegate: 'model1',
    //       baseDir: 'model1',
    //       database: 'ccr',
    //       host: 'localhost',
    //       port: '3306',
    //       username: 'root',
    //       dialect: 'mysql',
    //       timezone: '+08:00',
    //       underscored: true,
    //     },
    //   ],
    // },
  };
};
