'use strict';

var Common = require('core/common.js');
var DMThelper = require('neowiz/dmt/helper.js');

module.exports = {
  new: function (recordData, playerId, version) {
    var timestamp = Common.timestamp();
    var musicTypeName = DMThelper.musicTypeName(version, recordData.mode, recordData.musicType);
    var modeName = DMThelper.modeName(version, recordData.mode);
    return {
      musicId: recordData.musicId,
      playerId: playerId,
      isPass: true,
      isFullCombo: recordData.isFullCombo,
      isExc: recordData.isExc,
      isNormal: recordData.musicType === 1 && modeName !== 'star',
      isHard: recordData.musicType === 2,
      isMaximum: recordData.musicType === 3,
      isExtra: recordData.musicType === 4,
      isStar: modeName === 'star',
      mode: recordData.mode,
      modeName: modeName,
      musicType: recordData.musicType,
      musicTypeName: musicTypeName,
      version: version,
      score: recordData.score + recordData.maxComboBonus + recordData.feverBonus,
      maxCombo: recordData.maxCombo,
      feverBonus: recordData.feverBonus,
      maxComboBonus: recordData.maxComboBonus,
      grade: DMThelper.toGrade(modeName, recordData.score, recordData.max100, recordData.max, recordData.cool, recordData.good, recordData.miss, recordData.break),
      gradeText: DMThelper.toGradeText(modeName, recordData.score, recordData.max100, recordData.max, recordData.cool, recordData.good, recordData.miss, recordData.break),
      max100: recordData.max100,
      max: recordData.max,
      cool: recordData.cool,
      good: recordData.good,
      miss: recordData.miss,
      break: recordData.break,
      rank: recordData.rank,
      item1: DMThelper.toItemText(recordData.item1),
      item2: DMThelper.toItemText(recordData.item2),
      item3: DMThelper.toItemText(recordData.item3),
      createTime: timestamp,
      updateTime: timestamp
    };
  }
};