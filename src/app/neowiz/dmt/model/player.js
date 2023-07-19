'use strict';

var Common = require('core/common.js');

module.exports = {
  new: function (cardId) {
    var timestamp = Common.timestamp();
    return {
      cardId: cardId,
      createTime: timestamp,
      updateTime: timestamp,
      isDisabled: false
    };
  }
};