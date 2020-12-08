'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const quotaRouter = router.namespace('/quotas');

  quotaRouter.post('/list', controller.quota.list);
  quotaRouter.post('/:id', controller.quota.update);
};
