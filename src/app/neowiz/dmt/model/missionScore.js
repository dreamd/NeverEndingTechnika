'use strict';

var Common = require('core/common.js');
var DMThelper = require('neowiz/dmt/helper.js');

module.exports = {
  new: function (recordData, playerId, version) {
    var timestamp = Common.timestamp();
    var missionTypeName = DMThelper.missionTypeName(version, recordData.missionType);
    return {
      missionTypeName: missionTypeName,
      playerId: playerId,
      missionType: recordData.missionType,
      id: recordData.detailId,
      totalMax: recordData.totalMax,
      totalCool: recordData.totalCool,
      totalGood: recordData.totalGood,
      totalMiss: recordData.totalMiss,
      totalBreak: recordData.totalBreak,
      isFullCombo: recordData.totalMiss === 0 && recordData.totalBreak === 0,
      isPerfect: recordData.totalScoreExcludeBonus === 870000,
      maxComboBonus: recordData.maxComboBonus,
      totalScoreExcludeBonus: recordData.totalScoreExcludeBonus,
      maxCombo: recordData.maxCombo,
      createTime: timestamp,
      updateTime: timestamp
    };
  }
};