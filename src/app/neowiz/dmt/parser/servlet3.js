'use strict';

var Common = require('core/common.js');

module.exports = {
  handshakeReqInput: function (request) {
    return {
      type: 'handshakeReqInput',
      data: {}
    };
  },
  handshakeRecvInput: function (request) {
    return {
      type: 'handshakeRecvInput',
      data: {
        serverIp: Common.toString(request.slice(28, 40))
      }
    };
  },
  gameCommonInput: function (request) {
    return {
      type: 'gameCommonInput',
      data: {}
    };
  },
  serverAliveCheckInput: function (request) {
    return {
      type: 'serverAliveCheckInput',
      data: {}
    };
  },
  gameAliveConfirmInput: function (request) {
    return {
      type: 'gameAliveConfirmInput',
      data: {}
    };
  },
  playerDataInput: function (request) {
    return {
      type: 'playerDataInput',
      data: {
        cardId: Common.toString(request.slice(8, 28))
      }
    };
  },
  playResultInput: function (request) {
    return {
      type: 'playResultInput',
      data: {
        playerId: request.readUInt32LE(8),
        unknown1: request.readUInt32LE(12),
        unknown2: request.readUInt32LE(16),
        unknown3: request.readUInt32LE(20),
        unknown4: request.readUInt32LE(24),
        unknown5: request.readUInt32LE(28),
        unknown6: request.readUInt32LE(32),
        unknown7: request.readUInt32LE(36),
        unknown8: request.readUInt32LE(40),
        unknown9: request.readUInt32LE(50),
        unknown10: request.readUInt32LE(54),
        unknown11: request.readUInt16LE(58),
        unknown12: request.readUInt16LE(60),
        unknown13: request.readUInt16LE(62),
        unknown14: request.readUInt32LE(64),
        music1Score: request.readUInt32LE(68),
        music2Score: request.readUInt32LE(72),
        music3Score: request.readUInt32LE(76),
        music4Score: request.readUInt32LE(80),
        music1Combo: request.readUInt32LE(84),
        music2Combo: request.readUInt32LE(88),
        music3Combo: request.readUInt32LE(92),
        music4Combo: request.readUInt32LE(96),
        unknown15: request.readUInt32LE(100),
        unknown16: request.readUInt32LE(104),
        unknown17: request.readUInt32LE(108),
        unknown18: request.readUInt32LE(112),
        unknown19: request.readUInt32LE(116)
      }
    };
  },
  playResultMaxPointInput: function (request) {
    return {
      type: 'playResultMaxPointInput',
      data: {
        playerId: request.readUInt32LE(8),
        maxPoint: request.readUInt32LE(12)
      }
    };
  },
  playResultExpInput: function (request) {
    return {
      type: 'playResultExpInput',
      data: {
        playerId: request.readUInt32LE(8),
        toExp: request.readUInt32LE(12)
      }
    };
  },
  playResultCrewDataInput: function (request) {
    return {
      type: 'playResultCrewDataInput',
      data: {
        playerId: request.readUInt32LE(8),
        crewExp: request.readUInt32LE(12),
        crewMaxPoint: request.readUInt32LE(16)
      }
    };
  },
  playResultScoreInput: function (request) {
    var scoreList = [];
    for (var i = 0; i < 3; i++) {
      scoreList.push({
        mode: request.readUInt8(12),
        unknown1: request.readUInt8(13),
        musicId: request.readUInt32LE(12 + 2 + i * 47),
        musicType: request.readUInt8(12 + 6 + i * 47),
        rank: request.readUInt8(12 + 7 + i * 47),
        unknown2: request.readUInt8(12 + 8 + i * 47),
        score: request.readUInt32LE(12 + 9 + i * 47),
        maxCombo: request.readUInt16LE(12 + 13 + i * 47),
        unknown3: request.readUInt16LE(12 + 15 + i * 47),
        unknown4: request.readUInt16LE(12 + 17 + i * 47),
        break: request.readUInt16LE(12 + 19 + i * 47),
        miss: request.readUInt16LE(12 + 21 + i * 47),
        good: request.readUInt16LE(12 + 23 + i * 47),
        cool: request.readUInt16LE(12 + 25 + i * 47),
        max: request.readUInt16LE(12 + 27 + i * 47),
        max100: request.readUInt16LE(12 + 29 + i * 47),
        isExc: request.readUInt16LE(12 + 19 + i * 47) === 0 && request.readUInt16LE(12 + 21 + i * 47) === 0 && request.readUInt16LE(12 + 23 + i * 47) === 0 && request.readUInt16LE(12 + 25 + i * 47) === 0,
        isFullCombo: request.readUInt8(12 + 32 + i * 47) === 1,
        unknown5: request.readUInt16LE(12 + 33 + i * 47),
        item1: request.readUInt16LE(12 + 35 + i * 47),
        item2: request.readUInt16LE(12 + 37 + i * 47),
        item3: request.readUInt16LE(12 + 39 + i * 47),
        feverBonus: request.readUInt16LE(12 + 41 + i * 47),
        unknown6: request.readUInt16LE(12 + 43 + i * 47),
        maxComboBonus: request.readUInt16LE(12 + 45 + i * 47)
      });
    }
    return {
      type: 'playResultScoreInput',
      data: {
        playerId: request.readUInt32LE(8),
        scoreList: scoreList,
        unknown: request.readUInt16LE(12 + 3 * 47)
      }
    };
  },
  playResultClubInput: function (request) {
    return {
      type: 'playResultClubInput',
      data: {
        playerId: request.readUInt32LE(8),
        unknown1: request.readUInt32LE(12),
        unknown2: request.readUInt32LE(16),
        unknown3: request.readUInt32LE(20),
        unknown4: request.readUInt32LE(24),
        unknown5: request.readUInt32LE(26),
        unknown6: request.readUInt32LE(28),
        unknown7: request.readUInt32LE(30),
        unknown8: request.readUInt32LE(32),
        unknown9: request.readUInt32LE(34),
        unknown10: request.readUInt32LE(36),
        unknown11: request.readUInt32LE(38),
        unknown12: request.readUInt32LE(42),
        unknown13: request.readUInt32LE(46),
        unknown14: request.readUInt32LE(50),
        unknown15: request.readUInt32LE(54),
        unknown16: request.readUInt32LE(58),
        unknown17: request.readUInt32LE(62),
        unknown18: request.readUInt32LE(66),
        unknown19: request.readUInt32LE(70),
        unknown20: request.readUInt32LE(74),
        unknown21: request.readUInt32LE(78),
        unknown22: request.readUInt32LE(82),
        unknown23: request.readUInt32LE(86),
        unknown24: request.readUInt32LE(90),
        unknown25: request.readUInt32LE(94),
        unknown26: request.readUInt32LE(98),
        unknown27: request.readUInt32LE(102),
        unknown28: request.readUInt32LE(106),
        unknown29: request.readUInt32LE(110)
      }
    };
  },
  playResultSurpriseChallengeInput: function (request) {
    return {
      type: 'playResultSurpriseChallengeInput',
      data: {
        playerId: request.readUInt32LE(8),
        unknown1: request.readUInt32LE(12),
        unknown2: request.readUInt32LE(16)
      }
    };
  },
  playResultCrewChallengeInput: function (request) {
    return  {
      type: 'playResultCrewChallengeInput',
      data: {
        unknown1: request.readUInt32LE(8),
        playerId: request.readUInt32LE(12),
        missionType: request.readUInt32LE(20),
        id: request.readUInt32LE(16),
        detailId: request.readUInt32LE(24),
        totalMax: request.readUInt32LE(28),
        totalCool: request.readUInt32LE(36),
        totalGood: request.readUInt32LE(32),
        totalMiss: request.readUInt32LE(40),
        totalBreak: request.readUInt32LE(44),
        unknown3: request.readUInt16LE(48),
        unknown4: request.readUInt16LE(50),
        unknown5: request.readUInt32LE(52),
        maxComboBonus: request.readUInt32LE(56),
        unknown6: request.readUInt32LE(60),
        totalScoreExcludeBonus: request.readUInt32LE(64),
        maxCombo: request.readUInt32LE(68)
      }
    };
  },
  playResultCrewRaceInput: function (request) {
    return {
      type: 'playResultCrewRaceInput',
      data: {
        playerId: request.readUInt32LE(8),
        unknown1: request.readUInt16LE(12),
        unknown2: request.readUInt16LE(14),
        unknown3: request.readUInt16LE(16),
        unknown4: request.readUInt16LE(18),
        unknown5: request.readUInt16LE(20),
        unknown6: request.readUInt16LE(22),
        unknown7: request.readUInt16LE(24),
        unknown8: request.readUInt16LE(26),
        unknown9: request.readUInt16LE(28),
        unknown10: request.readUInt16LE(30),
        unknown11: request.readUInt16LE(32),
        unknown12: request.readUInt16LE(34),
        unknown13: request.readUInt16LE(36),
        unknown14: request.readUInt16LE(38),
        unknown15: request.readUInt16LE(40),
        unknown16: request.readUInt16LE(42),
        unknown17: request.readUInt8(44)
      }
    };
  },
  handshakeReqOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(14);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt32LE(response.seed, 8);
    return result;
  },
  handshakeRecvOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(61);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt8(response.authValid, 8);
    result.write(response.serverIp, 9, 20);
    result.write(response.shopName, 29, 20, 'utf8');
    return result;
  },
  gameCommonUnknown1Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(16);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt32LE(response.unknown1, 8);
    result.writeUInt32LE(response.unknown2, 12);
    return result;
  },
  gameCommonUnknown2Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(14);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt32LE(response.unknown1, 8);
    result.writeUInt8(response.unknown2, 12);
    result.writeUInt8(response.unknown3, 13);
    return result;
  },
  gameCommonCrewDetailOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(656);
    result.writeUInt32LE(response.id, 8);
    result.write(response.name, 12, 512, 'utf16le');
    result.writeUInt32LE(response.musicId1, 268 + 256);
    result.writeUInt32LE(response.musicId2, 272 + 256);
    result.writeUInt32LE(response.musicId3, 276 + 256);
    result.writeUInt32LE(response.musicNeedHalfSpeed1, 280 + 256);
    result.writeUInt32LE(response.musicNeedHalfSpeed2, 284 + 256);
    result.writeUInt32LE(response.musicNeedHalfSpeed3, 288 + 256);
    result.writeUInt16LE(response.musicType1, 292 + 256);
    result.writeUInt16LE(response.musicType2, 294 + 256);
    result.writeUInt16LE(response.musicType3, 296 + 256);
    result.writeUInt16LE(response.unknown1, 298 + 256);
    result.writeUInt16LE(response.music1Item1, 300 + 256);
    result.writeUInt16LE(response.music1Item2, 302 + 256);
    result.writeUInt16LE(response.music1Item3, 304 + 256);
    result.writeUInt16LE(response.unknown2, 306 + 256);
    result.writeUInt16LE(response.music2Item1, 308 + 256);
    result.writeUInt16LE(response.music2Item2, 310 + 256);
    result.writeUInt16LE(response.music2Item3, 312 + 256);
    result.writeUInt16LE(response.unknown3, 314 + 256);
    result.writeUInt16LE(response.music3Item1, 316 + 256);
    result.writeUInt16LE(response.music3Item2, 318 + 256);
    result.writeUInt16LE(response.music3Item3, 320 + 256);
    result.writeUInt32LE(response.maxMoreThen, 324 + 256);
    result.writeUInt32LE(response.maxLessThen, 328 + 256);
    result.writeUInt32LE(response.coolMoreThen, 332 + 256);
    result.writeUInt32LE(response.coolLessThen, 336 + 256);
    result.writeUInt32LE(response.goodMoreThen, 340 + 256);
    result.writeUInt32LE(response.goodLessThen, 344 + 256);
    result.writeUInt32LE(response.missMoreThen, 348 + 256);
    result.writeUInt32LE(response.missLessThen, 352 + 256);
    result.writeUInt32LE(response.breakMoreThen, 356 + 256);
    result.writeUInt32LE(response.breakLessThen, 360 + 256);
    result.writeUInt32LE(response.comboMoreThen, 364 + 256);
    result.writeUInt32LE(response.scoreMoreThen, 368 + 256);
    result.writeUInt8(response.needAllCombo, 372 + 256);
    result.writeUInt8(response.needPerfectPlay, 373 + 256);
    result.writeUInt32LE(response.bonusMaxPoint, 376 + 256);
    result.writeUInt32LE(response.bonusCrewMaxPoint, 380 + 256);
    result.writeUInt32LE(response.unknown4, 384 + 256);
    result.writeUInt32LE(response.unknown5, 388 + 256);
    result.writeUInt32LE(response.bonusIcon, 392 + 256);
    result.writeUInt32LE(response.unknown6, 396 + 256);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameCommonCrewProfileOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(2536);
    result.writeUInt32LE(response.id, 8);
    result.write(response.name, 12, 512, 'utf16le');
    result.writeUInt32LE(response.requireLevel, 524);
    result.writeUInt32LE(response.smallImageId, 528);
    result.writeUInt32LE(response.bigImageId, 532);
    result.write(response.text.trim(), 536, 2000, 'utf16le');
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameCommonCrewMissionOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(805);
    result.writeUInt8(response.unknown1, 8);
    result.writeUInt32LE(response.id, 9);
    result.writeUInt32LE(response.detailId, 13);
    result.writeUInt32LE(response.peopleCount, 17);
    result.writeUInt32LE(response.unknown2, 21);
    result.write(response.fromTime, 25, 260, 'utf8');
    result.write(response.toTime, 285, 260, 'utf8');
    result.write(response.unknown3, 544, 260, 'utf8');
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameCommonSpecialMissionOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(805);
    result.writeUInt8(response.unknown1, 8);
    result.writeUInt32LE(response.id, 9);
    result.writeUInt32LE(response.detailId, 13);
    result.writeUInt32LE(response.profileId, 17);
    result.writeUInt32LE(response.stage, 21);
    result.write(response.fromTime, 25, 260, 'utf8');
    result.write(response.toTime, 285, 260, 'utf8');
    result.write(response.unknown2, 544, 260, 'utf8');
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameCommonCrewChallengeOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(805);
    result.writeUInt8(response.unknown1, 8);
    result.writeUInt32LE(response.id, 9);
    result.writeUInt32LE(response.detailId, 13);
    result.writeUInt32LE(response.profileId, 17);
    result.writeUInt32LE(response.stage, 21);
    result.write(response.fromTime, 25, 260, 'utf8');
    result.write(response.toTime, 285, 260, 'utf8');
    result.write(response.unknown2, 544, 260, 'utf8');
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameCommonUnknown7Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(14);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt8(response.unknown1, 8);
    result.writeUInt32LE(response.unknown2, 9);
    result.writeUInt8(response.unknown3, 13);
    return result;
  },
  gameCommonHighScoreOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(39);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    result.writeUInt32LE(response.mode, 8);
    result.writeUInt32LE(response.musicId, 12);
    result.writeUInt8(response.musicType, 16);
    result.writeUInt32LE(response.score, 17);
    result.write(response.name, 21, 18, 'utf16le');
    return result;
  },
  serverAliveCheckOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(8);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  gameAliveCheckOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(8);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  clearPlayerCacheOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(8);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataMusicListOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(18);
    result.writeUInt8(response.mode, 8);
    result.writeUInt32LE(response.musicId, 9);
    result.writeUInt8(response.musicType, 13);
    result.writeUInt8(response.songStage, 14);
    result.writeUInt8(response.atStage, 15);
    result.writeUInt8(response.isNew, 16);
    result.writeUInt8(response.unknown1, 17);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerMusicScoreOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(23);
    result.writeUInt8(response.mode, 8);
    result.writeUInt32LE(response.musicId, 9);
    result.writeUInt8(response.musicType, 13);
    result.writeUInt8(response.rank, 14);
    result.writeUInt32LE(response.score, 15);
    result.writeUInt32LE(response.maxCombo, 19);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataUnknown1Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(16);
    result.writeUInt32LE(response.unknown1, 8);
    result.writeUInt32LE(response.unknown2, 12);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataUnknown2Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(20);
    result.writeUInt32LE(response.unknown1, 8);
    result.writeUInt32LE(response.unknown2, 12);
    result.writeUInt32LE(response.unknown3, 16);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataUnknown3Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(13);
    result.writeUInt32LE(response.unknown1, 8);
    result.writeUInt8(response.unknown2, 12);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataProfileOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(166);
    result.writeUInt32LE(response.playerId, 8);
    result.writeUInt32LE(response.unknown1, 12);
    result.writeUInt32LE(response.exp, 16);
    result.write(response.nickname, 20, 18, 'utf16le');
    result.writeUInt32LE(response.unknown2, 38);
    result.writeUInt32LE(response.icon, 42);
    result.writeUInt16LE(response.plate, 46);
    result.writeUInt16LE(response.pattern, 48);
    result.writeUInt32LE(response.addMessage, 50);
    result.write(response.message, 54, 24, 'utf16le');
    result.writeUInt32LE(response.noteSkin, 78);
    result.writeUInt32LE(response.maxPoint, 82);
    result.writeUInt32LE(response.hasTeam, 86);
    result.write(response.team, 90, 24, 'utf16le');
    result.writeUInt32LE(response.unknown3, 110);
    result.writeUInt16LE(response.teamIconBase, 114);
    result.writeUInt16LE(response.teamIconFront, 116);
    result.writeUInt32LE(response.unknown4, 118);
    result.writeUInt32LE(response.unknown5, 122);
    result.writeUInt32LE(response.unknown6, 130);
    result.writeUInt32LE(response.unknown7, 134);
    result.writeUInt32LE(response.crewRaceAddMaxPoint, 138);
    result.writeUInt32LE(response.maxBuff, 142);
    result.writeUInt32LE(response.expBuff, 146);
    result.writeUInt32LE(response.gaugeBuff, 150);
    result.writeUInt32LE(response.crewMissionAllCleared, 154);
    result.writeUInt32LE(response.unknown8, 158);
    result.writeUInt32LE(response.unknown9, 162);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataUnknown4Output: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(9);
    result.writeUInt8(response.authinAck, 8);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataCrewMissionOutput: function(params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(136);
    result.writeUInt32LE(response.index, 8);
    result.writeUInt32LE(response.id, 12);
    result.writeUInt32LE(response.unknown1, 16);
    result.write(response.unknown2, 20, 36, 'utf16le');
    result.write(response.nickname, 56, 80, 'utf16le');
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  },
  playerDataCrewChallengeOutput: function(params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(63);
    result.writeUInt32LE(response.index, 8);
    result.writeUInt32LE(response.playerId, 12);
    result.writeUInt32LE(response.missionType, 16);
    result.writeUInt8(response.id, 17);
    result.writeUInt32LE(response.totalMax, 21);
    result.writeUInt32LE(response.totalCool, 25);
    result.writeUInt32LE(response.totalGood, 29);
    result.writeUInt32LE(response.totalMiss, 33);
    result.writeUInt32LE(response.totalBreak, 37);
    result.writeUInt8(response.isPerfect, 41);
    result.writeUInt8(response.isFullCombo, 42);
    result.writeUInt32LE(response.unknown1, 43);
    result.writeUInt32LE(response.maxComboBonus, 47);
    result.writeUInt32LE(response.unknown2, 51);
    result.writeUInt32LE(response.totalScoreExcludeBonus, 55);
    result.writeUInt32LE(response.maxCombo, 59);
    result.writeUInt8(params.config.TYPE_TO_PACKAGE_TYPE[response.type], 0);
    return result;
  }
};