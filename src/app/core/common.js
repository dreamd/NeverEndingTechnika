'use strict';

var Decimal = require('decimal.js');
var moment = require('moment');
var SERVER_CONFIG = require('config.js');
var Iconv  = require('iconv').Iconv;
var GAME_CONFIG = require('game.js');

module.exports = {
  gameData: function(type, version) {
    return {
      type: type.toUpperCase(),
      name: GAME_CONFIG.NAME[type.toUpperCase()][version],
      version: version
    };
  },
  ensurePlayerId: function (playerId) {
    playerId = playerId.toString();
    while (playerId.length < 8) {
      playerId = '0' + playerId;
    }
    return playerId;
  },
  randomId: function(min, max) {
    return ('00000000' + Math.floor(Math.random() * (max - min + 1)) + min).substr(-8);
  },
  console: function (type, url, content = '') {
    var currentTime = moment().format('YYYY-MM-DD HH:mm:ss Z');
    console.log(SERVER_CONFIG.DELIMITER.CONSOLE + type.toUpperCase() + SERVER_CONFIG.DELIMITER.CONSOLE + ' ' + currentTime + "\n" + url, content);
  },
  error: function (connection, url, type, infomation) {
    var currentTime = moment().format('YYYY-MM-DD HH:mm:ss Z');
    var content = SERVER_CONFIG.DELIMITER.CONSOLE + 'ERROR' + SERVER_CONFIG.DELIMITER.CONSOLE + ' ' + currentTime + "\n" + url;
    console.error(content, infomation);
  },
  timestamp: function (needMillion = false) {
    return Math.floor(new Decimal(new Date().getTime()).div(needMillion ? 1 : 1000).toNumber());
  },
  toString: function (buffer) {
    for (var i = 0; i < buffer.length; i++) {
      if (buffer[i] === 0) {
        return buffer.slice(0, i).toString('utf8');
      }
    }
    return buffer.toString('utf8')
  }
};