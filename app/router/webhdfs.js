'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const webhdfsRouter = router.namespace('/webhdfs');
  webhdfsRouter.post('/download', controller.webhdfs.download);
  webhdfsRouter.get('/downloadFromHdfs', controller.webhdfs.downloadFromHdfs);
  webhdfsRouter.get('/downloadFromNode', controller.webhdfs.downloadFromNode);
  webhdfsRouter.get('/getJson', controller.webhdfs.getJson);


  webhdfsRouter.post('/upload', controller.webhdfs.upload);
};
