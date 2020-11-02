'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/info/:name', controller.info.get);
  router.post('/api/v1/info', controller.info.create);
};
