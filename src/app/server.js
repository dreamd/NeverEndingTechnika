'use strict';
var globalPath = process.cwd();
if (process.cwd().indexOf('source') > -1) {
  globalPath = require('fs').realpathSync(process.cwd() + '\\..\\..\\');
}
global.appPath = __dirname.replace(/\\/g, '/') + '/';
require('app-module-path').addPath(global.appPath);
var DMTserver = require('core/server.js');
DMTserver.main(globalPath.replace(/\\/g, '/'));