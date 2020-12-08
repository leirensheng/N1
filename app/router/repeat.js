'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const repeatRouter = router.namespace('/repeats');

  repeatRouter.post('/list', controller.repeat.list);
};
