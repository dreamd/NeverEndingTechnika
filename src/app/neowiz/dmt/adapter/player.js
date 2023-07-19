'use strict';

var q = require('q');
var Common = require('core/common.js');
var Storage = require('core/storage.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  generateId: function(count = 0) {
    count++;
    var playerId = Common.randomId(0, 99999999);
    return module.exports.dataById(playerId).then(function(player) {
      if (count >= 10) {
        throw {
          type: 'DMTplayerAdapter::generateId',
          errorCode: 100402
        };
      }
      if (!!player) {
        return module.exports.generateId(count);
      }
      return playerId;
    });
  },
  dataById: function(playerId, sortData = {}, filterData = {}) {
    if (!playerId) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).find({
      playerId: playerId
    }, filterData).sort(sortData).limit(1).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::dataById',
          errorCode: 100400
        };
      }
      return def.resolve(result[0]);
    });
    return def.promise;
  },
  dataByObjectId: function(objectId, sortData = {}, filterData = {}) {
    if (!objectId) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).find({
      _id: objectId
    }, filterData).sort(sortData).limit(1).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::dataByObjectId',
          errorCode: 100401
        };
      }
      return def.resolve(result[0]);
    });
    return def.promise;
  },
  listByObjectIdList: function(objectIdList, sortData = {}, filterData = {}, skip = 0, limit = 0) {
    if (!objectIdList || objectIdList.length === 0) {
      return q.when([]);
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).find({
      _id: {
        $in: objectIdList
      }
    }, filterData).sort(sortData).skip(skip).limit(limit).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::listByObjectIdList',
          errorCode: 100403
        };
      }
      return def.resolve(result);
    });
    return def.promise;
  },
  listByIdList: function(idList, sortData = {}, filterData = {}, skip = 0, limit = 0) {
    if (!idList || idList.length === 0) {
      return q.when([]);
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).find({
      playerId: {
        $in: idList
      }
    }, filterData).sort(sortData).skip(skip).limit(limit).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::listByIdList',
          errorCode: 100404
        };
      }
      return def.resolve(result);
    });
    return def.promise;
  },
  new: function(player) {
    return module.exports.generateId().then(function(playerId) {
      var def = q.defer();
      player.playerId = playerId;
      Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).insert(player, function(err, result) {
        if (err) {
          throw {
            type: 'DMTplayerAdapter::new',
            errorCode: 100405
          };
        }
        return def.resolve(result.ops[0]);
      });
      return def.promise;
    });
  },
  updateById: function(playerId, updateData) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).update({
      playerId: playerId
    }, {
      $set: updateData
    }, function(err) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::updateById',
          errorCode: 100406
        };
      }
      return def.resolve();
    });
    return def.promise;
  },
  updateByObjectId: function(playerObjectId, updateData) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.PLAYER).update({
      _id: playerObjectId
    }, {
      $set: updateData
    }, function(err) {
      if (err) {
        throw {
          type: 'DMTplayerAdapter::updateById',
          errorCode: 100407
        };
      }
      return def.resolve();
    });
    return def.promise;
  }
};