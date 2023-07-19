'use strict';

var MongoClient = require('mongodb').MongoClient;
var nodeMonkey = require('node-monkey');
var Common = require('core/common.js');
var NeowizOperater = require('core/neowizOperater.js');
var Storage = require('core/storage.js');
var SERVER_CONFIG = require('config.js');

module.exports = {
  main: function (globalPath) {
    MongoClient.connect(SERVER_CONFIG.DATABASE.ADDRESS, function(err, db) {
      if (err) {
        console.log('auto run db..');
        require('child_process').exec('cmd /c "' + globalPath + '/db.bat"');
        setTimeout(function () {
          module.exports.main(globalPath);
        }, 1000);
      } else {
        Storage.db = db;
        Storage.globalPath = globalPath;
        module.exports.browserLog();
        NeowizOperater.syncMusicDB();
        NeowizOperater.server().listen(SERVER_CONFIG.PORT.DMT2, function() {
          console.log('dmt2 server run as ' + SERVER_CONFIG.PORT.DMT2);
        });
        NeowizOperater.server().listen(SERVER_CONFIG.PORT.DMT3, function() {
          console.log('dmt3 server run as ' + SERVER_CONFIG.PORT.DMT3);
        });
        NeowizOperater.server().listen(SERVER_CONFIG.PORT.DMT_DEBUG, function() {
          console.log('dmt debug server run as ' + SERVER_CONFIG.PORT.DMT_DEBUG);
        });
        NeowizOperater.server().listen(SERVER_CONFIG.PORT.DMT2KR, function() {
          console.log('dmt2 kr server run as ' + SERVER_CONFIG.PORT.DMT2KR);
        });
      }
    });
  },
  browserLog: function () {
    var CONFIG = SERVER_CONFIG.CONSOLE;
    return nodeMonkey.start({
      host: CONFIG.ADDRESS,
      port: CONFIG.PORT
    });
  }
};