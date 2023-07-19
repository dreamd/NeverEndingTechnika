'use strict';

var q = require('q');
var Storage = require('core/storage.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  dataById: function (musicId, sortData = {}, filterData = {}) {
    if (!musicId) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC).find({
      musicId: musicId
    }, filterData).sort(sortData).limit(1).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicAdapter::dataById',
          errorCode: 100100
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
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC).find(searchData, filterData).sort(sortData).skip(skip).limit(limit).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicAdapter::listByData',
          errorCode: 100101
        };
      }
      return def.resolve(result);
    });
    return def.promise;
  },
  updateById: function (musicId, updateData) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC).update({
      musicId: musicId
    }, {
      $set: updateData
    }, function(err) {
      if (err) {
        throw {
          type: 'DMTmusicAdapter::updateById',
          errorCode: 100102
        };
      }
      return def.resolve();
    });
    return def.promise;
  },
  new: function(music) {
    var def = q.defer();
    Storage.db.collection(DMT_CONFIG.COLLECTION.MUSIC).insert(music, function(err, result) {
      if (err) {
        throw {
          type: 'DMTmusicAdapter::new',
          errorCode: 100103
        };
      }
      return def.resolve(result.ops[0]);
    });
    return def.promise;
  }
};