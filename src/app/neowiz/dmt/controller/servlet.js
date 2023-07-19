'use strict';

var q = require('q');
var fs = require('fs');
var Common = require('core/common.js');
var DMThelper = require('neowiz/dmt/helper.js');
var DMTadapter = require('neowiz/dmt/adapter.js');
var Storage = require('core/storage.js');

module.exports = {
  unknownReq: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    var resultList = [];
    return DMThelper.outputData(socket, parser, resultList);
  },
  handshakeReq: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    var resultList = [];
    resultList.push({
      type: 'handshakeReqOutput',
      seed: Math.floor(Math.random() * 0xFFFFFFFF)
    });
    return DMThelper.outputData(socket, parser, resultList);
  },
  handshakeRecv: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    var resultList = [];
    resultList.push({
      type: 'handshakeRecvOutput',
      authValid: 1,
      shopName: 'DJMAX',
      serverIp: '127.0.0.1'
    });
    return DMThelper.outputData(socket, parser, resultList);
  },
  gameCommon: function(socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    var version = socket.params.version;
    if (socket.params.version < 2) {
      version = 3;
    }
    var resultList = [];
    return q.when().then(function () {
      if (version === 2) {
        return;
      }
      var path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewchallengedetail.csv';
      var tempData = fs.readFileSync(path, {
        encoding: 'utf16le'
      });
      var fileList = tempData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        resultList.push({
          type: 'gameCommonCrewDetailOutput',
          id: parseInt(data[0], 10),
          name: data[1],
          musicId1: parseInt(data[2], 10),
          musicId2: parseInt(data[8], 10),
          musicId3: parseInt(data[14], 10),
          musicType1: parseInt(data[3], 10),
          musicType2: parseInt(data[9], 10),
          musicType3: parseInt(data[15], 10),
          musicNeedHalfSpeed1: parseInt(data[4], 10),
          musicNeedHalfSpeed2: parseInt(data[10], 10),
          musicNeedHalfSpeed3: parseInt(data[16], 10),
          unknown1: 0,
          music1Item1: data[5] === '-1' ? 65535 : parseInt(data[5], 10),
          music1Item2: data[6] === '-1' ? 65535 : parseInt(data[6], 10),
          music1Item3: data[7] === '-1' ? 65535 : parseInt(data[7], 10),
          unknown2: 0,
          music2Item1: data[11] === '-1' ? 65535 : parseInt(data[11], 10),
          music2Item2: data[12] === '-1' ? 65535 : parseInt(data[12], 10),
          music2Item3: data[13] === '-1' ? 65535 : parseInt(data[13], 10),
          unknown3: 0,
          music3Item1: data[17] === '-1' ? 65535 : parseInt(data[17], 10),
          music3Item2: data[18] === '-1' ? 65535 : parseInt(data[18], 10),
          music3Item3: data[19] === '-1' ? 65535 : parseInt(data[19], 10),
          maxMoreThen: parseInt(data[20], 10),
          maxLessThen: parseInt(data[21], 10),
          coolMoreThen: parseInt(data[22], 10),
          coolLessThen: parseInt(data[23], 10),
          goodMoreThen: parseInt(data[24], 10),
          goodLessThen: parseInt(data[25], 10),
          missMoreThen: parseInt(data[26], 10),
          missLessThen: parseInt(data[27], 10),
          breakMoreThen: parseInt(data[28], 10),
          breakLessThen: parseInt(data[29], 10),
          comboMoreThen: parseInt(data[30], 10),
          scoreMoreThen: parseInt(data[31], 10),
          needAllCombo: parseInt(data[32], 10),
          needPerfectPlay: parseInt(data[33], 10),
          bonusMaxPoint: parseInt(data[34], 10),
          bonusCrewMaxPoint: parseInt(data[35], 10),
          unknown4: 0,
          unknown5: 0,
          bonusIcon: 65535,
          unknown6: 0
        });
      }
      path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewchallengeprofile.csv';
      tempData = fs.readFileSync(path, {
        encoding: 'utf16le'
      });
      fileList = tempData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        resultList.push({
          type: 'gameCommonCrewProfileOutput',
          id: parseInt(data[0], 10),
          name: data[1],
          requireLevel: 1,
          smallImageId: parseInt(data[2], 10),
          bigImageId: parseInt(data[3], 10),
          text: data[4]
        });
      }
      path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewmission.csv';
      tempData = fs.readFileSync(path, {
        encoding: 'utf16le'
      });
      fileList = tempData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        resultList.push({
          type: 'gameCommonCrewMissionOutput',
          unknown1: 0,
          id: parseInt(data[0], 10),
          detailId: parseInt(data[1], 10),
          peopleCount: parseInt(data[2], 10),
          unknown2: 0,
          fromTime: data[3],
          toTime: data[4],
          unknown3: ''
        });
      }
      path = Storage.globalPath + '/resource/dmt/dmt' + version + '/specialmission.csv';
      tempData = fs.readFileSync(path, {
        encoding: 'utf16le'
      });
      fileList = tempData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        resultList.push({
          type: 'gameCommonSpecialMissionOutput',
          unknown1: 0,
          id: parseInt(data[0], 10),
          detailId: parseInt(data[1], 10),
          profileId: parseInt(data[2], 10),
          stage: parseInt(data[3], 10),
          fromTime: data[4],
          toTime: data[5],
          unknown2: ''
        });
      }
      path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewchallenge.csv';
      tempData = fs.readFileSync(path, {
        encoding: 'utf16le'
      });
      fileList = tempData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        resultList.push({
          type: 'gameCommonCrewChallengeOutput',
          unknown1: 0,
          id: parseInt(data[0], 10),
          detailId: parseInt(data[1], 10),
          profileId: parseInt(data[2], 10),
          stage: parseInt(data[3], 10),
          fromTime: data[4],
          toTime: data[5],
          unknown2: ''
        });
      }
      var musicTypeList = ['star', 'normal', 'hard', 'maximum', 'extra'];
      return DMTadapter.musicListByData({
        version: {
          $lte: version
        }
      }).then(function(musicList) {
        for (var i = 0; i < musicList.length; i++) {
          for (var j = 0; j < musicTypeList.length; j++) {
            var levelSection = DMThelper.levelSectionData(musicList[i], musicTypeList[j]);
            if (levelSection.rankingList.length > 0) {
              resultList.push({
                type: 'gameCommonHighScoreOutput',
                mode: (musicTypeList[j] === 'star' ? 0 : 1) + (version === 3 ? 0 : 1),
                musicId: musicList[i].musicId,
                musicType: musicTypeList[j] === 'star' ? 1 : j,
                score: levelSection.rankingList[0].score,
                name: (!!levelSection.rankingList[0].playerData ? levelSection.rankingList[0].playerData.nickname : 'New User')
              });
            }
          }
        }
      })
    })
    .then (function () {
      return DMThelper.outputData(socket, parser, resultList);
    });
  },
  serverAliveCheck: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    return q.when().then(function () {
      if (!input.playResultInput) {
        return;
      }
      return module.exports.playResult(socket, requestList)
    }).then(function() {
      if (!input.playerDataInput) {
        return [];
      }
      return module.exports.playerData(socket, requestList, true);
    }).then(function(extraResultList) {
      var resultList = [];
      resultList.push({
        type: 'serverAliveCheckOutput'
      });
      resultList.push({
        type: 'gameAliveCheckOutput'
      });
      resultList = resultList.concat(extraResultList);
      return DMThelper.outputData(socket, parser, resultList);
    });
  },
  gameAliveConfirm: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    return q.when().then(function () {
      if (!input.playResultInput) {
        return;
      }
      return module.exports.playResult(socket, requestList)
    }).then(function() {
      if (!input.playerDataInput) {
        return [];
      }
      return module.exports.playerData(socket, requestList, true);
    }).then(function(resultList) {
      return DMThelper.outputData(socket, parser, resultList);
    });
  },
  playerData: function (socket, requestList, needRaw = false) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    return DMTadapter.fullPlayerDataByCardId(input.playerDataInput[0].cardId, null, socket.params.version).then(function(playerData) {
      var resultList = [];
      if (version !== 2) {
        resultList.push({
          type: 'clearPlayerCacheOutput'
        });
      }
      var modeList = ['star', 'pop'];
      if (socket.params.version === 2) {
        modeList = ['duo', 'star', 'pop'];
      }
      var normalSongStageList = ['stage1', 'stage2', 'stage3', 'stage+'];
      var duoSongStageList = ['stage1', 'stage2'];
      var musicTypeList = ['star', 'normal', 'hard', 'maximum', 'extra'];
      var normalAtStageList = ['stage1', 'stage2', 'stage3'];
      var duoAtStageList = ['stage1', 'stage2'];
      var version = socket.params.version;
      if (socket.params.version < 2) {
        version = 3;
      }
      return DMTadapter.musicListByData({
        version: {
          $lte: version
        }
      }).then(function(musicList) {
        for (var i = 0; i < musicList.length; i++) {
          var popMusicTypeList = [];
          var starMusicTypeList = [1];
          for (var j = 1; j < musicTypeList.length; j++) {
            if (musicList[i][musicTypeList[j]].level['v' + version] !== '0') {
              popMusicTypeList.push(j);
            }
          }
          for (var j = 0; j < modeList.length; j++) {
            var addMusicTypeList = ['duo', 'star'].indexOf(modeList[j]) > -1 ? starMusicTypeList : popMusicTypeList;
            for (var k = 0; k < addMusicTypeList.length; k++) {
              var songStageList = modeList[j] !== 'duo' ? normalSongStageList : duoSongStageList;
              for (var l = 0; l < songStageList.length; l++) {
                var atStageList = modeList[j] !== 'duo' ? normalAtStageList : duoAtStageList;
                for (var m = 0; m < atStageList.length; m++) {
                  resultList.push({
                    type: 'playerDataMusicListOutput',
                    mode: j,
                    musicId: musicList[i].musicId,
                    musicType: addMusicTypeList[k],
                    songStage: l,
                    atStage: m,
                    isNew: 0,
                    unknown1: 0
                  });
                }
              }
            }
          }
        }
        return DMTadapter.musicBestListByData({
          playerId: playerData.playerId
        }).then(function(musicBestList) {
          for (var i = 0; i < musicBestList.length; i++) {
            for (var j = 0; j < musicTypeList.length; j++) {
              var mode = j > 0 ? 1 : 0;
              if (socket.params.version === 2) {
                mode++;
              }
              var levelSectionData = DMThelper.levelSectionData(musicBestList[i], musicTypeList[j]);
              if (levelSectionData.playCount > 0) {
                resultList.push({
                  type: 'playerMusicScoreOutput',
                  mode: mode,
                  musicId: musicBestList[i].musicId,
                  musicType: j,
                  rank: levelSectionData.rank,
                  score: levelSectionData.score,
                  maxCombo: levelSectionData.maxCombo
                });
              }
            }
          }
          resultList.push({
            type: 'playerDataUnknown1Output',
            unknown1: 0,
            unknown2: 0
          });
          resultList.push({
            type: 'playerDataUnknown3Output',
            unknown1: 0,
            unknown2: 0
          });
        })
        .then(function () {
          if (version === 2) {
            return;
          }
          resultList.push({
            type: 'playerDataUnknown2Output',
            unknown1: 0,
            unknown2: 0,
            unknown3: 0
          });
          return DMTadapter.missionScoreDataByPlayerId(playerData.playerId)
          .then(function (missionScoreList) {
            for (var i = 0; i < missionScoreList.length; i++) {
              resultList.push({
                type: 'playerDataCrewChallengeOutput',
                index: i,
                playerId: parseInt(playerData.playerId, 10),
                missionType: missionScoreList[i].missionType,
                id: missionScoreList[i].id,
                totalMax: missionScoreList[i].totalMax,
                totalCool: missionScoreList[i].totalCool,
                totalGood: missionScoreList[i].totalGood,
                totalMiss: missionScoreList[i].totalMiss,
                totalBreak: missionScoreList[i].totalBreak,
                isFullCombo: missionScoreList[i].isFullCombo ? 1 : 0,
                isPerfect: missionScoreList[i].isPerfect ? 1 : 0,
                unknown1: 0,
                maxComboBonus: missionScoreList[i].maxComboBonus,
                unknown2: 0,
                totalScoreExcludeBonus: missionScoreList[i].totalScoreExcludeBonus,
                maxCombo: missionScoreList[i].maxCombo
              });
            }
            var missionListDetailMatching = {};
            var path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewmission.csv';
            var tempData = fs.readFileSync(path, {
              encoding:'utf16le'
            });
            var fileList = tempData.split("\n");
            for (var i = 1; i < fileList.length; i++) {
              var data = fileList[i].split("\t");
              if (!data[0]) {
                continue;
              }
              missionListDetailMatching['M' + data[0]] = data[1];
            }
            var missionDetailMatching = {};
            path = Storage.globalPath + '/resource/dmt/dmt' + version + '/crewchallengedetail.csv';
            tempData = fs.readFileSync(path, {
              encoding:'utf16le'
            });
            fileList = tempData.split("\n");
            for (var i = 1; i < fileList.length; i++) {
              var data = fileList[i].split("\t");
              if (!data[0]) {
                continue;
              }
              missionDetailMatching['M' + data[0]] = {
                maxMoreThen: parseInt(data[20], 10),
                maxLessThen: parseInt(data[21], 10),
                coolMoreThen: parseInt(data[22], 10),
                coolLessThen: parseInt(data[23], 10),
                goodMoreThen: parseInt(data[24], 10),
                goodLessThen: parseInt(data[25], 10),
                missMoreThen: parseInt(data[26], 10),
                missLessThen: parseInt(data[27], 10),
                breakMoreThen: parseInt(data[28], 10),
                breakLessThen: parseInt(data[29], 10),
                comboMoreThen: parseInt(data[30], 10),
                scoreMoreThen: parseInt(data[31], 10),
                needAllCombo: parseInt(data[32], 10),
                needPerfectPlay: parseInt(data[33], 10)
              };
            }
            for (var i = 0; i < missionScoreList.length; i++) {
              if (missionScoreList[i].missionTypeName === 'CrewMission' && !!missionListDetailMatching['M' + missionScoreList[i].id]) {
                var detailId = missionListDetailMatching['M' + missionScoreList[i].id];
                if(!!missionDetailMatching['M' + detailId]) {
                  if (DMThelper.isMissionPassed(missionDetailMatching['M' + detailId], missionScoreList[i])) {
                    var a = 0;
                    resultList.push({
                      type: 'playerDataCrewMissionOutput',
                      index: i,
                      id: missionScoreList[i].id,
                      unknown1: 0,
                      unknown2: '',
                      nickname: playerData.dmtData.nickname
                    });
                  }
                }
              }
            }
          });
        })
        .then(function () {
          resultList.push({
            type: 'playerDataProfileOutput',
            playerId: playerData.playerId,
            nickname: playerData.dmtData.nickname,
            message: playerData.dmtData.message,
            unknown1: 0,
            exp: parseInt(playerData.dmtData.exp, 10),
            unknown2: 0,
            icon: parseInt(playerData.dmtData.icon, 10),
            plate: parseInt(playerData.dmtData.plate, 10),
            pattern: parseInt(playerData.dmtData.pattern, 10),
            addMessage: 1,
            noteSkin: parseInt(playerData.dmtData.noteSkin, 10),
            maxPoint: parseInt(playerData.dmtData.maxPoint, 10),
            hasTeam: playerData.dmtData.hasTeam ? 1 : 0,
            unknown3: 0,
            teamIconBase: parseInt(playerData.dmtData.teamIconBase, 10),
            teamIconFront: parseInt(playerData.dmtData.teamIconFront, 10),
            unknown4: 0,
            unknown5: 0,
            unknown6: 0,
            unknown7: 0,
            crewRaceAddMaxPoint: 0,
            maxBuff: parseInt(playerData.dmtData.maxBuff, 10),
            expBuff: parseInt(playerData.dmtData.expBuff, 10),
            gaugeBuff: parseInt(playerData.dmtData.gaugeBuff, 10),
            crewMissionAllCleared: 1,
            unknown8: 0,
            unknown9: 0,
            team: playerData.dmtData.teamName
          });
          resultList.push({
            type: 'playerDataUnknown4Output',
            authinAck: 13
          });
          if (needRaw) {
            return resultList;
          }
          return DMThelper.outputData(socket, parser, resultList);
        });
      });
    });
  },
  playResult: function (socket, requestList) {
    var parser = DMThelper.parser(socket.params.version);
    var input = DMThelper.inputData(socket, parser, requestList);
    var resultList = [];
    var playerId = Common.ensurePlayerId(input.playResultInput[0].playerId);
    return DMTadapter.playerDataById(playerId, socket.params.version).then(function(player) {
      if (!input.playResultScoreInput) {
        return player;
      }
      var musicIndex = 0;
      var updateMusicData = function(result) {
        if (musicIndex >= input.playResultScoreInput[0].scoreList.length) {
          return;
        }
        var musicScore = DMTadapter.newMusicScoreModel(result, playerId, socket.params.version);
        if (musicScore.musicId === 0) {
          return;
        }
        if (!!player) {
          musicScore.playerData = player.dmtData;
        } else {
          var versionModel = DMThelper.playerModel(socket.params.version);
          musicScore.playerData = versionModel.default();
        }
        DMTadapter.updateMusicByMusicId(musicScore.musicId, musicScore).catch(function(error) {
          console.error(error, requestList);
        });
        if (!player) {
          return;
        }
        DMTadapter.newMusicScore(musicScore).catch(function(error) {
          console.error(error, requestList);
        });
        return DMTadapter.musicBestDataByPlayerId(musicScore.playerId, musicScore.musicId).then(function(musicBest) {
          if (!musicBest) {
            return DMTadapter.newMusicBest(musicScore);
          }
          return DMTadapter.updateMusicBestByPlayerId(musicScore.playerId, musicScore.musicId, musicBest, musicScore.musicTypeName, musicScore);
        }).then(function() {
          musicIndex++;
          updateMusicData(input.playResultScoreInput[0].scoreList[musicIndex]);
        }).catch(function(error) {
          return console.error (error, requestList);
        });
      };
      if (input.playResultScoreInput[0].scoreList.length > 0) {
        updateMusicData(input.playResultScoreInput[0].scoreList[musicIndex]);
      }
      return player;
    }).then(function(player) {
      if (!input.playResultCrewChallengeInput) {
        return player;
      }
      var missionScore = DMTadapter.newMissionScoreModel(input.playResultCrewChallengeInput[0], playerId, socket.params.version);
      if (missionScore.missionTypeName === 'Unknown') {
        return player;
      }
      DMTadapter.newMissionScore(missionScore).catch(function(error) {
        console.error(error, requestList);
      });
      return player;
    })
    .then (function (player) {
      if (!input.playResultMaxPointInput && !input.playResultExpInput) {
        return;
      }
      player.dmtData.exp = parseInt(player.dmtData.exp, 10);
      player.dmtData.maxPoint = parseInt(player.dmtData.maxPoint, 10);
      
      if (input.playResultExpInput) {
        player.dmtData.exp = input.playResultExpInput[0].toExp;
      }
      if (input.playResultMaxPointInput) {
        player.dmtData.maxPoint += input.playResultMaxPointInput[0].maxPoint;
      }
      DMTadapter.updatePlayerByCardId(player.cardId, socket.params.version, player.dmtData);
    }).then(function() {
      return DMThelper.outputData(socket, parser, resultList);
    });
  }
};