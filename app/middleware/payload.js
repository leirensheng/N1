'use strict';

module.exports = () => {

  const ignoreList = [
    /preview/i,
    /downloadFromHdfs/i,
    /downloadFromNode/i,
    /generateCode/i,
  ];

  return async function payload(ctx, next) {
    await next();

    let isIgnored = false;
    for (const i in ignoreList) {
      if (ignoreList[i].test(ctx.request.path)) {
        isIgnored = true;
        break;
      }
    }
    if (
      ((ctx.status >= 200 &&
      ctx.status < 300) || !ctx.body) &&
      !isIgnored
    ) {
      if (!ctx.body || ctx.body.code === undefined) {
        ctx.body = {
          code: 0,
          data: ctx.body,
          message: '',
        };
      }
    }
  };
};
