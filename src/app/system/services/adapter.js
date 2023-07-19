'use strict';

var ServicesCardAdapter = require('system/services/adapter/card.js');

module.exports = {
  newCard: function (cardId, cardType) {
    return ServicesCardAdapter.new(cardId, cardType);
  },
  cardDataByCardId: function (cardId, cardType, sortData, filterData) {
    return ServicesCardAdapter.dataById(cardId, cardType, sortData, filterData);
  },
  updateCardByCardId: function (cardId, updateData) {
    return ServicesCardAdapter.updateById(cardId, updateData);
  }
};