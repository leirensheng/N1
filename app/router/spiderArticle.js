'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const spiderArticleRouter = router.namespace('/spiderArticles');

  spiderArticleRouter.post('/discard', controller.spiderArticle.discard);
};
