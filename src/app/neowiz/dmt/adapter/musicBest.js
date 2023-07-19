'use strict';

var q = require('q');
var Storage = require('core/storage.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  dataByPlayerId: function (playerId, musicId, version, sortData = {}, filterData = {}) {
    if (!playerId || !musicId) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC_BEST).find({
      playerId: playerId,
      musicId: musicId
    }, filterData).sort(sortData).limit(1).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicBestAdapter::dataByPlayerId',
          errorCode: 100200
        };
      }
      return def.resolve(result[0]);
    });
    return def.promise;
  },
  listByData: function (searchData, sortData = {}, filterData = {}, skip = 0, limit = 0) {
    if (!searchData) {
      return q.when([]);
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC_BEST).find(searchData, filterData).sort(sortData).skip(skip).limit(limit).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicBestAdapter::list',
          errorCode: 100201
        };
      }
      return def.resolve(result);
    });
    return def.promise;
  },
  new: function (musicBest) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC_BEST).insert(musicBest, function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicBestAdapter::new',
          errorCode: 100202
        };
      }
      return def.resolve(result.ops[0]);
    });
    return def.promise;
  },
  updateByPlayerId: function (playerId, musicId, version, updateData) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC_BEST).update({
      playerId: playerId,
      musicId: musicId
    }, {
      $set: updateData
    }, function(err) {
      if (err) {
        throw {
          type: 'DMTmusicBestAdapter::updateByPlayerId',
          errorCode: 100203
        };
      }
      return def.resolve();
    });
    return def.promise;
  }
};