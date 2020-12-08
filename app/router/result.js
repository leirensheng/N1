'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const resultRouter = router.namespace('/results');

  resultRouter.post('/list', controller.result.list);
};
