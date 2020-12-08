'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const categoryRouter = router.namespace('/categoryCompares');

  categoryRouter.post('/list', controller.categoryCompare.list);
  categoryRouter.post('/:id', controller.categoryCompare.update);
};
