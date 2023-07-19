'use strict';

var Common = require('core/common.js');

module.exports = {
  new: function (cardId, cardType) {
    var timestamp = Common.timestamp();
    return {
      cardType: cardType,
      cardId: cardId,
      //isDisabled: false,
      gameRef: {},
      createTime: timestamp,
      updateTime: timestamp
    };
  }
};