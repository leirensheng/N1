'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const categoryRouter = router.namespace('/categories');

  categoryRouter.get('/', controller.category.all);
  categoryRouter.post('/list', controller.category.list);
};
