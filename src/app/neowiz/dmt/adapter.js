'use strict';

var Decimal = require('decimal.js');
var Common = require('core/common.js');
var fs = require('fs');
var Storage = require('core/storage.js');
var DMThelper = require('neowiz/dmt/helper.js');
var ServicesAdapter = require('system/services/adapter.js');
var DMTmusicAdapter = require('neowiz/dmt/adapter/music.js');
var DMTmusicBestAdapter = require('neowiz/dmt/adapter/musicBest.js');
var DMTmusicScoreAdapter = require('neowiz/dmt/adapter/musicScore.js');
var DMTmissionScoreAdapter = require('neowiz/dmt/adapter/missionScore.js');
var DMTplayerAdapter = require('neowiz/dmt/adapter/player.js');
var DMTmusicBestModel = require('neowiz/dmt/model/musicBest.js');
var DMTmusicScoreModel = require('neowiz/dmt/model/musicScore.js');
var DMTmissionScoreModel = require('neowiz/dmt/model/missionScore.js');
var DMTplayerModel = require('neowiz/dmt/model/player.js');

module.exports = {
  fullPlayerDataByCardId: function (cardId, arcadeId, version) {
    return ServicesAdapter.cardDataByCardId(cardId, 'dmt').then(function (cardData) {
      if (!cardData) {
        return ServicesAdapter.newCard(cardId, 'dmt');
      }
      return cardData;
    }).then (function (cardData) {
      if (!cardData['gameRef']['dmt']) {
        return module.exports.newPlayer(cardId, version).then(function (player) {
          return module.exports.registCardGameReference(cardId, arcadeId, player._id, version).then(function() {
            return player._id;
          });
        });
      } else if (!cardData['gameRef']['dmt'] || !cardData['gameRef']['dmt']['dmt' + version]) {
        var versionModel = DMThelper.playerModel(version);
        var profile = versionModel.default();
        module.exports.updatePlayerByCardId(cardId, version, profile);
        module.exports.registCardGameReference(cardId, arcadeId, cardData['gameRef']['dmt'].playerId, version);
      }
      return cardData['gameRef']['dmt'].playerId;
    }).then (function (playerObjectId) {
      return module.exports.playerDataByObjectId(playerObjectId, version);
    });
  },
  registCardGameReference: function (cardId, arcadeId, playerObjectId, version) {
    var timestamp = Common.timestamp();
    var updateData = {
      "updateTime": timestamp,
      'gameRef.dmt.playerId': playerObjectId
    };
    //updateData['gameRef.dmt.dmt' + version + '.arcadeId'] = arcadeId;
    updateData['gameRef.dmt.dmt' + version + '.isBinding'] = false;
    updateData['gameRef.dmt.dmt' + version + '.timestamp'] = timestamp;
    return ServicesAdapter.updateCardByCardId(cardId, updateData);
  },
  musicListByData: function (searchData, version, sortData, filterData, skip, limit) {
    return DMTmusicAdapter.listByData(searchData, sortData, filterData, skip, limit);
  },
  musicBestDataByPlayerId: function (playerId, musicId, version, sortData, filterData) {
    return DMTmusicBestAdapter.dataByPlayerId(playerId, musicId, version, sortData, filterData);
  },
  missionScoreDataByPlayerId: function (playerId, sortData, filterData) {
    return DMTmissionScoreAdapter.listByPlayerId(playerId, sortData, filterData);
  },
  musicBestListByData: function (searchData, version, sortData, filterData, skip, limit) {
    return DMTmusicBestAdapter.listByData(searchData, sortData, filterData, skip, limit);
  },
  newMusicBest: function (musicScore, version) {
    var musicBest = DMTmusicBestModel.new();
    DMThelper.updateMusicBest(musicBest, musicScore);
    DMTmusicBestAdapter.new(musicBest);
  },
  newMusicScore: function (musicScore) {
    return DMTmusicScoreAdapter.new(musicScore);
  },
  newMissionScore: function (missionScore) {
    return DMTmissionScoreAdapter.new(missionScore);
  },
  newMusicScoreModel: function (reqData, playerId, version) {
    return DMTmusicScoreModel.new(reqData, playerId, version);
  },
  newMissionScoreModel: function (reqData, playerId, version) {
    return DMTmissionScoreModel.new(reqData, playerId, version);
  },
  newPlayer: function (cardId, version) {
    var playerData = DMTplayerModel.new(cardId);
    var versionModel = DMThelper.playerModel(version);
    var profile = versionModel.default();
    module.exports.updatePlayerByCardId(cardId, version, profile);
    return DMTplayerAdapter.new(playerData);
  },
  showPlayerData: function (playerData, version) {
    if (!playerData) {
      return null;
    }
    var versionModel = DMThelper.playerModel(version);
    var profileData = versionModel.default();
    var profilePath = Storage.globalPath + '/card/' + playerData.cardId + '/dmt' + version + '.json';
    if (fs.existsSync(profilePath)) {
      profileData = JSON.parse(fs.readFileSync(profilePath, {encoding: 'utf8'}));
    }
    return {
      timestamp: Common.timestamp(),
      version: version,
      playerObjectId: playerData._id,
      dmtData: profileData,
      cardId: playerData.cardId,
      playerId: playerData.playerId,
      isDisable: !!playerData.isDisabled
    };
  },
  playerDataById: function (playerId, version, sortData = {}, filterData = {}) {
    return DMTplayerAdapter.dataById(playerId, sortData, filterData).then(function (playerData) {
      return module.exports.showPlayerData(playerData, version);
    });
  },
  playerDataByObjectId: function (playerObjectId, version, sortData = {}, filterData = {}) {
    return DMTplayerAdapter.dataByObjectId(playerObjectId, sortData, filterData).then(function (playerData) {
      return module.exports.showPlayerData(playerData, version);
    });
  },
  updateMusicBestByPlayerId: function (playerId, musicId, musicBest, musicTypeName, musicScore, version) {
    DMThelper.updateMusicBest(musicBest, musicScore);
    var updateData = {
      updateTime: Common.timestamp()
    };
    updateData[musicTypeName] = DMThelper.levelSectionData(musicBest, musicTypeName);
    return DMTmusicBestAdapter.updateByPlayerId(playerId, musicId, version, updateData);
  },
  updateMusicByMusicId: function (musicId, musicScore) {
    return DMTmusicAdapter.dataById(musicId).then(function(music) {
      if (!music) {
        return;
      }
      var levelSection = DMThelper.levelSectionData(music, musicScore.musicTypeName);
      levelSection.playCount++;
      if (musicScore.isExc) {
        levelSection.excCount++;
      }
      if (musicScore.isFullCombo) {
        levelSection.fullComboCount++;
      }
      if (musicScore.isPass) {
        levelSection.passCount++;
      }
      if (!musicScore.isPass) {
        levelSection.failCount++;
      }
      levelSection.clearRate = parseInt(new Decimal(levelSection.passCount).div(levelSection.playCount).times(100).toNumber(), 10);
      levelSection.failRate = parseInt(new Decimal(levelSection.failCount).div(levelSection.playCount).times(100).toNumber(), 10);
      levelSection.fullComboRate = parseInt(new Decimal(levelSection.fullComboCount).div(levelSection.playCount).times(100).toNumber(), 10);
      levelSection.excRate = parseInt(new Decimal(levelSection.fullComboCount).div(levelSection.playCount).times(100).toNumber(), 10);
      if (!levelSection.rankingList) {
        levelSection.rankingList = [];
      }
      var newRankingList = [];
      var addToRanking = false;
      for (var i = 0; i < levelSection.rankingList.length; i++) {
        var rankingData = levelSection.rankingList[i]
        if (musicScore.playerId !== rankingData.playerId) {
          if (!addToRanking && musicScore.score > rankingData.score) {
            addToRanking = true;
            newRankingList.push(musicScore);
            newRankingList.push(rankingData);
          } else if (!addToRanking && musicScore.score === rankingData.score) {
            newRankingList.push(rankingData);
            if (!!levelSection.rankingList[i + 1]) {
              if (musicScore.score > levelSection.rankingList[i + 1].score) {
                addToRanking = true;
                newRankingList.push(musicScore);
              }
            } else {
              addToRanking = true;
              newRankingList.push(musicScore);
            }
          } else {
            newRankingList.push(rankingData);
          }
        } else {
          if (!addToRanking) {
            addToRanking = true;
            if (musicScore.score >= rankingData.score) {
              newRankingList.push(musicScore);
            } else {
              newRankingList.push(rankingData);
            }
          }
        }
        if (newRankingList.length >= 10) {
          continue;
        }
      }
      if (!addToRanking && newRankingList.length < 10) {
        newRankingList.push(musicScore);
      }
      if (newRankingList.length > 10) {
        newRankingList.length = 10;
      }
      levelSection.rankingList = newRankingList;
      var updateData = {
        playCount: !music.playCount ? 0 : music.playCount + 1,
        updateTime: Common.timestamp()
      };
      updateData[musicScore.musicTypeName] = levelSection;
      updateData.playCount = music.playCount + 1;
      DMTmusicAdapter.updateById(musicScore.musicId, updateData);
    });
  },
  updatePlayerByCardId: function (cardId, version, updateData) {
    var cardFolder = Storage.globalPath + '/card/' + cardId + '/';
    if (!fs.existsSync(cardFolder)){
        fs.mkdirSync(cardFolder);
    }
    fs.writeFileSync(cardFolder + 'dmt' + version + '.json', JSON.stringify(updateData));
  }
};