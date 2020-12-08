'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const ruleRouter = router.namespace('/rules');
  ruleRouter.post('/list', controller.rule.list);
};
