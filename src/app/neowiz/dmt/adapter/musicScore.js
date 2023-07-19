'use strict';

var q = require('q');
var Storage = require('core/storage.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  new: function (musicScore) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC_SCORE).insert(musicScore, function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicScoreAdapter::new',
          errorCode: 100300
        };
      }
      return def.resolve(result.ops[0]);
    });
    return def.promise;
  }
};