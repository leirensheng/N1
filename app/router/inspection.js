'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const inspectionRouter = router.namespace('/inspections');

  inspectionRouter.post('/list', controller.inspection.list);
};
