'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // validate: {
  //   enable: true,
  //   package: 'egg-validate',
  // },

  // validatePlus: {
  //   enable: false,
  //   package: 'egg-validate-plus',
  // },

  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  // mongoose: {
  //   enable: true, // 开启插件
  //   package: 'egg-mongoose',
  // },
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};
