'use strict'

var q = require('q');
var SERVER_CONFIG = require('config.js');
var DMTmusicModel = require('neowiz/dmt/model/music.js');
var DMTmusicAdapter = require('neowiz/dmt/adapter/music.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

module.exports = {
  updateList: function(musicList, version) {
    var musicTypeList = ['star', 'normal', 'hard', 'maximum', 'extra'];
    var musicIndex = 0;
    var addMusicData = function() {
      var musicData = musicList[musicIndex];
      var newMusicData = DMTmusicModel.new();
      newMusicData.musicId = musicData[1];
      newMusicData.title = musicData[2];
      newMusicData.artist = musicData[3];
      newMusicData.version = musicData[0];
      for (var i = 0; i < musicTypeList.length; i++) {
        newMusicData[musicTypeList[i]].name['v' + version.toString()] = DMT_CONFIG.DIFFICULT_TITLE[i];
        newMusicData[musicTypeList[i]].level['v' + version.toString()] = musicData[4 + i].toString();
      }
      return DMTmusicAdapter.dataById(newMusicData.musicId).then(function(musicData) {
        if (!musicData) {
          return DMTmusicAdapter.new(newMusicData);
        }
        return musicData;
      }).then(function(musicData) {
        newMusicData.version = musicData.version;
        for (var i = 0; i < musicTypeList.length; i++) {
          newMusicData[musicTypeList[i]].playCount = musicData[musicTypeList[i]].playCount;
          newMusicData[musicTypeList[i]].passCount = musicData[musicTypeList[i]].passCount;
          newMusicData[musicTypeList[i]].failCount = musicData[musicTypeList[i]].failCount;
          newMusicData[musicTypeList[i]].clearRate = musicData[musicTypeList[i]].clearRate;
          newMusicData[musicTypeList[i]].failRate = musicData[musicTypeList[i]].failRate;
          newMusicData[musicTypeList[i]].fullComboCount = musicData[musicTypeList[i]].fullComboCount;
          newMusicData[musicTypeList[i]].fullComboRate = musicData[musicTypeList[i]].fullComboRate;
          newMusicData[musicTypeList[i]].excCount = musicData[musicTypeList[i]].excCount;
          newMusicData[musicTypeList[i]].excRate = musicData[musicTypeList[i]].excRate;
          newMusicData[musicTypeList[i]].rankingList = musicData[musicTypeList[i]].rankingList;
          if (isNaN(newMusicData[musicTypeList[i]].playCount)) {
            newMusicData[musicTypeList[i]].playCount = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].passCount)) {
            newMusicData[musicTypeList[i]].passCount = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].failCount)) {
            newMusicData[musicTypeList[i]].failCount = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].clearRate)) {
            newMusicData[musicTypeList[i]].clearRate = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].failRate)) {
            newMusicData[musicTypeList[i]].failRate = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].fullComboCount)) {
            newMusicData[musicTypeList[i]].fullComboCount = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].fullComboRate)) {
            newMusicData[musicTypeList[i]].fullComboRate = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].excCount)) {
            newMusicData[musicTypeList[i]].excCount = 0;
          }
          if (isNaN(newMusicData[musicTypeList[i]].excRate)) {
            newMusicData[musicTypeList[i]].excRate = 0;
          }
          for (var j = DMT_CONFIG.OLDEST_VERSION; j <= DMT_CONFIG.NEWEST_VERSION; j++) {
            if (j !== version) {
              if (version !== DMT_CONFIG.OLDEST_VERSION) {
                newMusicData[musicTypeList[i]].name['v' + j] = musicData[musicTypeList[i]].name['v' + j];
                newMusicData[musicTypeList[i]].level['v' + j] = musicData[musicTypeList[i]].level['v' + j];
                if (!newMusicData[musicTypeList[i]].name['v' + j]) {
                  newMusicData[musicTypeList[i]].name['v' + j] = newMusicData[musicTypeList[i]].name['v' + version];
                }
                if (!newMusicData[musicTypeList[i]].level['v' + j]) {
                  newMusicData[musicTypeList[i]].level['v' + j] = 0;
                }
              } else {
                newMusicData[musicTypeList[i]].name['v' + j] = musicData[musicTypeList[i]].name['v' + j];
                newMusicData[musicTypeList[i]].level['v' + j] = 0;
                if (!newMusicData[musicTypeList[i]].name['v' + j]) {
                  newMusicData[musicTypeList[i]].name['v' + j] = newMusicData[musicTypeList[i]].name['v' + version];
                }
              }
            } 
          }
          
        }
        newMusicData.playCount = musicData.playCount;
        if (isNaN(newMusicData.playCount)) {
          newMusicData.playCount = 0;
        }
        return DMTmusicAdapter.updateById(newMusicData.musicId, newMusicData).then(function() {
          musicIndex++;
          if (musicIndex < musicList.length) {
            return addMusicData();
          }
        });
      });
    };
    return addMusicData();
  },
  fixList: function() {
    var musicTypeList = ['star', 'normal', 'hard', 'maximum', 'extra'];
    var def = q.defer();
    DMTmusicAdapter.listByData({}).then(function(musicList) {
      var musicIndex, updateMusicData;
      var musicIndex = 0;
      var updateMusicData = function() {
        var musicData = musicList[musicIndex];
        var isErrorFormat = false;
        var totalPlayCount = 0;
        var oldPlayCount = musicData.playCount;
        for (var i = 0; i < musicTypeList.length; i++) {
          totalPlayCount += musicData[musicTypeList[i]].playCount;
          for (var j = DMT_CONFIG.OLDEST_VERSION; j <= DMT_CONFIG.NEWEST_VERSION; j++) {
            musicData[musicTypeList[i]].level['v' + j] = 0;
          }
        }
        if (!musicData.playCount) {
          musicData.playCount = totalPlayCount;
        }
        return DMTmusicAdapter.updateById(musicData.musicId, musicData).then(function() {
          musicIndex++;
          if (musicList.length > musicIndex) {
            return updateMusicData();
          } else {
            def.resolve();
          }
        });
      };
      if (musicList.length > musicIndex) {
        return updateMusicData();
      } else {
        def.resolve();
      }
    });
    return def.promise;
  }
};