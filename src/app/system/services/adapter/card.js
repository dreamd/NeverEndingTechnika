'use strict';

var q = require('q');
var Storage = require('core/storage.js');
var SERVICES_CONFIG = require('system/services/config.js');
var ServicescardModel = require('system/services/model/card.js');

module.exports = {
  new: function (cardId, cardType) {
    var def = q.defer();
    var card = ServicescardModel.new(cardId, cardType); 
    Storage.db.collection(SERVICES_CONFIG.COLLECTION.CARD).insert(card, function(err, result) {
      if (err) {
        throw {
          type: 'ServicesCardAdapter::new',
          errorCode: 90000
        };
      }
      return def.resolve(result.ops[0]);
    });
    return def.promise;
  },
  dataById: function (cardId, cardType, sortData = {}, filterData = {}) {
    if (!cardId || !cardType) {
      return q.when();
    }
    var def = q.defer();
    Storage.db.collection(SERVICES_CONFIG.COLLECTION.CARD).find({cardId: cardId, cardType: cardType}, filterData).sort(sortData).limit(1).toArray(function(err, result) {
      if (err) {
        throw {
          type: 'ServicesCardAdapter::dataById',
          errorCode: 90001
        };
      }
      return def.resolve(result[0]);
    });
    return def.promise;
  },
  updateById(cardId, updateData) {
    var def = q.defer();
    Storage.db.collection(SERVICES_CONFIG.COLLECTION.CARD).update({
      cardId: cardId
    }, {
      $set: updateData
    }, function(err) {
      if (err) {
        throw {
          type: 'ServicesCardAdapter::updateById',
          errorCode: 90002
        };
      }
      return def.resolve();
    });
    return def.promise;
  }
};