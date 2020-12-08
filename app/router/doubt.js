'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const doubtRouter = router.namespace('/doubts');

  doubtRouter.post('/list', controller.doubt.list);
};
