'use strict';

var q = require('q');
var Storage = require('core/storage.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  new: function (missionScore) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MISSION_SCORE).insert(missionScore, function(err, result) {
      if (err) {
        throw {
          type: 'DMTmissionScoreAdapter::new',
          errorCode: 100500
        };
      }
      return def.resolve(result.ops[0]);
    });
    return def.promise;
  },
  listByPlayerId: function(playerId, sortData = {}, filterData = {}) {
    if (!playerId) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MISSION_SCORE).find({
      playerId: playerId
    }, filterData).sort(sortData).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicScoreAdapter::listByPlayerId',
          errorCode: 100501
        };
      }
      return def.resolve(result);
    });
    return def.promise;
  }
};