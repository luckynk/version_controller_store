'use strict';

const path = require('path');

module.exports = app => {

  // add all validate
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
}