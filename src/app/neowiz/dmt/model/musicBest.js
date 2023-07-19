'use strict';

var Common = require('core/common.js');

module.exports = {
  new: function () {
    var timestamp = Common.timestamp();
    return {
      playerId: null,
      musicId: null,
      star: {
        fullComboCount: 0,
        playCount: 0,
        passCount: 0,
        failCount: 0,
        excCount: 0,
        score: 0,
        grade: 0,
        gradeText: '',
        rank: 0,
        maxCombo: 0,
        scoreInfo: {
          max100: 0,
          max: 0,
          cool: 0,
          good: 0,
          miss: 0,
          break: 0,
          feverBonus: 0,
          maxComboBonus: 0,
          rank: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          maxCombo: 0
        }
      },
      normal: {
        fullComboCount: 0,
        passCount: 0,
        failCount: 0,
        playCount: 0,
        excCount: 0,
        score: 0,
        grade: 0,
        gradeText: '',
        rank: 0,
        maxCombo: 0,
        scoreInfo: {
          max100: 0,
          max: 0,
          cool: 0,
          good: 0,
          miss: 0,
          break: 0,
          feverBonus: 0,
          maxComboBonus: 0,
          rank: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          maxCombo: 0
        }
      },
      hard: {
        fullComboCount: 0,
        passCount: 0,
        failCount: 0,
        playCount: 0,
        excCount: 0,
        score: 0,
        grade: 0,
        gradeText: '',
        rank: 0,
        maxCombo: 0,
        scoreInfo: {
          max100: 0,
          max: 0,
          cool: 0,
          good: 0,
          miss: 0,
          break: 0,
          feverBonus: 0,
          maxComboBonus: 0,
          rank: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          maxCombo: 0
        }
      },
      maximum: {
        fullComboCount: 0,
        passCount: 0,
        failCount: 0,
        playCount: 0,
        excCount: 0,
        score: 0,
        grade: 0,
        gradeText: '',
        rank: 0,
        maxCombo: 0,
        scoreInfo: {
          max100: 0,
          max: 0,
          cool: 0,
          good: 0,
          miss: 0,
          break: 0,
          feverBonus: 0,
          maxComboBonus: 0,
          rank: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          maxCombo: 0
        }
      },
      extra: {
        fullComboCount: 0,
        passCount: 0,
        failCount: 0,
        playCount: 0,
        excCount: 0,
        score: 0,
        grade: 0,
        gradeText: '',
        rank: 0,
        maxCombo: 0,
        scoreInfo: {
          max100: 0,
          max: 0,
          cool: 0,
          good: 0,
          miss: 0,
          break: 0,
          feverBonus: 0,
          maxComboBonus: 0,
          rank: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          maxCombo: 0
        }
      },
      playCount: 0,
      createTime: timestamp,
      updateTime: timestamp
    };
  }
};