'use strict';
const getId = require('../app/extend/utils/getId');

module.exports = {
  context: '',

  middleware: [
    'requestLogger',
    'compress',
    'errorHandler',
    'formatParams',
    'payload',
    'validator',
  ],
  remote: {
    webhdfs: 'http://192.168.1.212:50070/webhdfs/v1',
  },
  getUser: {
    ignore: ctx => {
      const ignoreList = [
        {
          method: 'GET',
          regexp: /materials$/,
          special: true,
        },
        {
          method: 'GET',
          regexp: /materials\/(\d)+$/,
        }, {
          method: 'GET',
          regexp: /materials\/search$/,
        }, {
          method: 'GET',
          regexp: /needs$/,
        }, {
          method: 'GET',
          regexp: /needs\/raise$/,
        }, {
          method: 'POST',
          regexp: /comments\/init$/,
        }, {
          method: 'GET',
          regexp: /comments$/,
        }, {
          method: 'GET',
          regexp: /statistics$/,
        }];
      const res = ignoreList.find(one => one.method === ctx.request.method && one.regexp.test(ctx.path));
      // 如果不是必须的接口，如果带上token也经过中间件
      if (res && res.special && ctx.request.header.authorization) {
        return false;
      }
      return !!res;
    },
  },
  authority: {
    match: ctx => {
      const list = [
        // {
        //   method: 'PUT',
        //   regexp: /needs$/,
        // }
      ];
      const res = list.find(one => one.method === ctx.request.method && one.regexp.test(ctx.path));
      return !!res;
    },
  },
  multipart: {
    mode: 'stream',
    fileSize: '51200mb', // 文件上传的大小限制
    fileExtensions: [
      '.md',
      '.txt',
      '.vue',
      '.wav',
      '.jpg',
      '.exe',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.csv',
      '.doc',
      '.docx',
      '.7z',
      '.apk',
      '.rar',
      '.pdf',
      '.msi',
      '.flac',
      '.ttf',
      '.woff',
      '.scss',
      '.sql',
      'model',
      'h5',
      'labels',
      'vocab',
    ],
    // fields: 100,
  },
  requestLogger: {
    enable: true,
  },
  security: {
    csrf: {
      enable: false,
    },
  },
  ssh: {
    host: '192.168.1.213',
    user: 'root',
    pass: 'root',
  },
  // sequelize: {
  //   datasources: [
  //     {
  //       delegate: 'model2',
  //       baseDir: 'model2',
  //       database: 'ccr-dataproc',
  //       host: '192.168.1.201',
  //       port: '3306',
  //       username: 'root',
  //       password: 'ccr@654321',
  //       dialect: 'mysql',
  //       timezone: '+08:00',
  //       define: {
  //         hooks: {
  //           beforeCreate: instance => {
  //             if (instance._modelOptions.tableName === 'batch' && !instance.id) {
  //               instance.id = getId();
  //             }
  //           },
  //         },
  //       },
  //     },
  //     {
  //       delegate: 'model1',
  //       baseDir: 'model1',
  //       database: 'DCQA_0_0_15',
  //       host: '192.168.1.201',
  //       port: '3306',
  //       username: 'root',
  //       password: 'ccr@654321',
  //       dialect: 'mysql',
  //       timezone: '+08:00',
  //       underscored: true,
  //     },
  //     {
  //       delegate: 'model3',
  //       baseDir: 'model3',
  //       database: 'ccr-dc',
  //       host: '192.168.1.201',
  //       port: '3306',
  //       username: 'root',
  //       password: 'ccr@654321',
  //       dialect: 'mysql',
  //       timezone: '+08:00',
  //       underscored: true,
  //     },
  //   ],
  // },
  // mongoose: {
  //   client: {
  //     url: 'mongodb://ccreport:123456@192.168.1.202:27017/files',
  //     options: {},
  //   // mongoose global plugins, expected a function or an array of function and options
  //   // plugins: [ createdPlugin, [ updatedPlugin, pluginOptions ]],
  //   },
  // },
};
