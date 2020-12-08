'use strict';

module.exports = () => {
  console.log('>>>> load config.dev.js');

  return {

    requestLogger: {
      enable: false,
    },
    logger: {
      dir: './logs/prd',
    },
  };
};
