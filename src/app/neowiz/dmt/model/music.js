'use strict';

var Common = require('core/common.js');

module.exports = {
  new: function () {
    var timestamp = Common.timestamp();
    return {
      version: -1,
      musicId: 0,
      title: '',
      artist: '',
      star: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      normal: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      hard: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      maximum: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      maximum: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      extra: {
        level: {},
        name: {},
        clearRate: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        failRate: 0,
        fullComboCount: 0,
        fullComboRate: 0,
        excCount: 0,
        excRate: 0,
        rankingList: []
      },
      playCount: 0,
      createTime: timestamp,
      updateTime: timestamp
    };
  }
};