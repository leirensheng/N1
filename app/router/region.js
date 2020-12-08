'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const regionRouter = router.namespace('/regions');

  regionRouter.post('/list', controller.region.list);
};
