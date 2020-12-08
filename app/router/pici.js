'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const piciRouter = router.namespace('/picis');

  piciRouter.post('/list', controller.pici.list);
  piciRouter.put('/', controller.pici.create);
  piciRouter.get('/check', controller.pici.check);

  piciRouter.post('/:id/execute', controller.pici.execute);
  piciRouter.post('/:id/stopExecute', controller.pici.stopExecute);

  piciRouter.post('/:id', controller.pici.update);
  piciRouter.get('/:id', controller.pici.detail);

  piciRouter.delete('/:id', controller.pici.destroy);

};
