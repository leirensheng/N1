'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const mapRuleRouter = router.namespace('/mapRules');

  mapRuleRouter.post('/list', controller.mapRule.list);
  mapRuleRouter.put('/', controller.mapRule.create);
  mapRuleRouter.post('/:id', controller.mapRule.update);
  mapRuleRouter.delete('/:id', controller.mapRule.destroy);

};
