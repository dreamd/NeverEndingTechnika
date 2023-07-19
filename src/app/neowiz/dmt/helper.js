'use strict';

var Common = require('core/common.js');

module.exports = {
  toItemText: function (item) {
    var itemList = [
      '',
      '',
      'fadeout',
      'fadeout2',
      'fadein',
      'fadein2',
      'blank',
      'blink2',
      'blind',
      'right2',
      'leftright',
      'left2'
    ];
    return itemList[item];
  },
  toGradeTextByGrade: function (grade) {
    if (grade <= 100) {
      return grade.toString();
    }
    else if (grade === 108) {
      return 'S++';
    }
    else if (grade === 107) {
      return 'S+';
    }
    else if (grade === 106) {
      return 'S';
    }
    else if (grade === 105) {
      return 'A++';
    }
    else if (grade === 104) {
      return 'A+';
    }
    else if (grade === 103) {
      return 'A';
    }
    else if (grade === 102) {
      return 'B';
    }
    else if (grade === 101) {
      return 'C';
    }
    return grade.toString();
  },
  toGradeText: function (modeName, score, max, cool, good, miss, breakCount) {
    if (modeName === 'star') {
      var totalNoteCount = max + cool + good + miss + breakCount;
      return Math.ceil((max / totalNoteCount + cool / totalNoteCount * 0.9 + good / totalNoteCount * 0.85) * 100).toString();
    }
    if (score >= 295000) {
      return 'S++';
    }
    else if (score >= 290000) {
      return 'S+';
    }
    else if (score >= 285000) {
      return 'S';
    }
    else if (score >= 280000) {
      return 'A++';
    }
    else if (score >= 270000) {
      return 'A+';
    }
    else if (score >= 260000) {
      return 'A';
    }
    else if (score >= 220000) {
      return 'B';
    }
    return 'C';
  },
  toGrade: function (modeName, score, max100, max, cool, good, miss, breakCount) {
    if (modeName === 'star') {
      var totalNoteCount = max100 + max + cool + good + miss + breakCount;
      return Math.ceil(((max100 + max) / totalNoteCount + cool / totalNoteCount * 0.9 + good / totalNoteCount * 0.85) * 100);
    }
    if (score >= 295000) {
      return 108;
    }
    else if (score >= 290000) {
      return 107;
    }
    else if (score >= 285000) {
      return 106;
    }
    else if (score >= 280000) {
      return 105;
    }
    else if (score >= 270000) {
      return 104;
    }
    else if (score >= 260000) {
      return 103;
    }
    else if (score >= 220000) {
      return 102;
    }
    return 101;
  },
  modeName: function (version, mode) {
    var modeList = [
      [],
      [],
      ['duo', 'star', 'pop', 'club', 'race'],
      ['star', 'pop', 'club', 'race', 'challenge']
    ];
    return modeList[version][mode];
  },
  musicTypeName: function (version, mode, musicType) {
    var musicTypeList = ['normal', 'normal', 'hard', 'maximum', 'extra'];
    if ((version === 2 && mode === 1) || mode === 0) {
      return 'star';
    }
    return musicTypeList[musicType];
  },
  'missionTypeNameToMissionType': function (version, missionType) {
    if (missionType === 'CrewChallenge') {
      return 9;
    }
    else if (missionType === 'SpecialMission') {
      return 10;
    }
    else if (missionType === 'CrewMission') {
      return 7;
    }
    return 'Unknown';
  },
  'missionTypeName': function (version, missionType) {
    if (missionType === 9) {
      return 'CrewChallenge';
    }
    else if (missionType === 10) {
      return 'SpecialMission';
    }
    else if (missionType === 7) {
      return 'CrewMission';
    }
    return 'Unknown';
  },
  levelSectionData: function (data, musicTypeName) {
    return data[musicTypeName];
  },
  parser: function (version) {
    version = version === 1 ? DMT_CONFIG.DEBUG_VERSION : version;
    return require('neowiz/dmt/parser/servlet' + version + '.js');
  },
  config: function (version) {
    version = version === 1 ? DMT_CONFIG.DEBUG_VERSION : version;
    return require('neowiz/dmt/config/dmt' + version + '.js');
  },
  playerModel: function (version) {
    if (version < 2) {
      version = version === 1 ? DMT_CONFIG.DEBUG_VERSION : 3;
    }
    return require('neowiz/dmt/model/player' + version + '.js');
  },
  updateMusicBest: function (musicBest, musicScore) {
    if (!musicBest.playerId) {
      musicBest.playerId = musicScore.playerId;
      musicBest.musicId = musicScore.musicId;
    }
    var levelSection = module.exports.levelSectionData(musicBest, musicScore.musicTypeName);
    if (musicScore.score > levelSection.score) {
      levelSection.score = musicScore.score;
      levelSection.scoreInfo = {
        max100: musicScore.max100,
        max: musicScore.max,
        cool: musicScore.cool,
        good: musicScore.good,
        miss: musicScore.miss,
        break: musicScore.break,
        feverBonus: musicScore.feverBonus,
        maxComboBonus: musicScore.maxComboBonus,
        rank: musicScore.rank,
        item1: musicScore.item1,
        item2: musicScore.item2,
        item3: musicScore.item3,
        maxCombo: musicScore.maxCombo
      };
    }
    if (musicScore.grade > levelSection.grade) {
      levelSection.grade = musicScore.grade;
      levelSection.gradeText = musicScore.gradeText;
    }
    if (musicScore.maxCombo > levelSection.maxCombo) {
      levelSection.maxCombo = musicScore.maxCombo;
    }
    if (musicScore.rank > levelSection.rank) {
      levelSection.rank = musicScore.rank;
    }
    if (musicScore.isFullCombo) {
      levelSection.fullComboCount++;
    }
    if (musicScore.isExc) {
      levelSection.excCount++;
    }
    levelSection.playCount++;
    musicBest.playCount++;
  },
  inputData: function (socket, parser, requestList) {
    var resultList = {
      timestamp: Common.timestamp()
    };
    for (var i = 0; i < requestList.length; i++) {
      var type = socket.params.config.PACKAGE_TYPE_TO_TYPE[requestList[i].slice(0, 1).toString('hex')];
      if (!resultList[type]) {
        resultList[type] = [];
      }
      resultList[type].push(parser[type](requestList[i]).data);
    }
    socket.requestOutput = resultList;
    return resultList;
  },
  outputData: function (socket, parser, responseList) {
    socket.responseInput = responseList;
    var resultList = [];
    for (var i = 0; i < responseList.length; i++) {
      if (!socket.params.config.TYPE_TO_PACKAGE_TYPE[responseList[i].type]) {
        continue;
      }
      resultList.push(parser[responseList[i].type](socket.params, responseList[i]));
    }
    return resultList;
  },
  isMissionPassed: function(missionData, missionScore) {
    if (missionData.maxMoreThen !== 0 && missionScore.totalMax < missionData.maxMoreThen) {
      return false;
    }
    if (missionData.maxLessThen !== 0 && missionScore.totalMax > missionData.maxLessThen) {
      return false;
    }
    if (missionData.coolMoreThen !== 0 && missionScore.totalCool < missionData.coolMoreThen) {
      return false;
    }
    if (missionData.coolLessThen !== 0 && missionScore.totalCool > missionData.coolLessThen) {
      return false;
    }
    if (missionData.goodMoreThen !== 0 && missionScore.totalGood < missionData.goodMoreThen) {
      return false;
    }
    if (missionData.goodLessThen !== 0 && missionScore.totalGood > missionData.goodLessThen) {
      return false;
    }
    if (missionData.missMoreThen !== 0 && missionScore.totalMiss < missionData.missMoreThen) {
      return false;
    }
    if (missionData.missLessThen !== 0 && missionScore.totalMiss > missionData.missLessThen) {
      return false;
    }
    if (missionData.breakMoreThen !== 0 && missionScore.totalBreak < missionData.breakMoreThen) {
      return false;
    }
    if (missionData.breakLessThen !== 0 && missionScore.totalBreak > missionData.breakLessThen) {
      return false;
    }
    if (missionData.comboMoreThen !== 0 && missionScore.maxCombo < missionData.comboMoreThen) {
      return false;
    }
    if (missionData.scoreMoreThen !== 0 && (missionScore.totalScoreExcludeBonus + missionScore.maxComboBonus) < missionData.scoreMoreThen) {
      return false;
    }
    if (missionData.needAllCombo !== 0 && !missionScore.isFullCombo) {
      return false;
    }
    if (missionData.needPerfectPlay !== 0 && !missionScore.isPerfect) {
      return false;
    }
    return true;
  }
};