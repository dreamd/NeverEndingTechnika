'use strict';

var Common = require('core/common.js');

module.exports = {
  unknownReqInput: function (request) {
    return {
      type: 'unknownReqInput',
      data: {}
    };
  },
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
        unknown18: request.readUInt32LE(112)
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
        crewExp: request.readUInt32LE(12)
      }
    };
  },
  playResultScoreInput: function (request) {
    var scoreList = [];
    for (var i = 0; i < 3; i++) {
      scoreList.push({
        mode: request.readUInt8(12),
        unknown1: request.readUInt8(13),
        musicId: request.readUInt32LE(12 + 2 + i * 49),
        musicType: request.readUInt8(12 + 6 + i * 49),
        rank: request.readUInt8(12 + 7 + i * 49),
        unknown2: request.readUInt8(12 + 8 + i * 49),
        score: request.readUInt32LE(12 + 9 + i * 49),
        maxCombo: request.readUInt16LE(12 + 13 + i * 49),
        unknown3: request.readUInt16LE(12 + 15 + i * 49),
        unknown4: request.readUInt16LE(12 + 17 + i * 49),
        break: request.readUInt16LE(12 + 19 + i * 49),
        miss: request.readUInt16LE(12 + 21 + i * 49),
        good: request.readUInt16LE(12 + 23 + i * 49),
        cool: request.readUInt16LE(12 + 25 + i * 49),
        max: request.readUInt16LE(12 + 27 + i * 49),
        max100: 0,
        isExc: request.readUInt16LE(12 + 19 + i * 49) === 0 && request.readUInt16LE(12 + 21 + i * 49) === 0 && request.readUInt16LE(12 + 23 + i * 49) === 0 && request.readUInt16LE(12 + 25 + i * 49) === 0,
        isFullCombo: request.readUInt8(12 + 30 + i * 49) === 1,
        unknown5: request.readUInt16LE(12 + 31 + i * 49),
        item1: request.readUInt16LE(12 + 33 + i * 49),
        item2: request.readUInt16LE(12 + 35 + i * 49),
        item3: request.readUInt16LE(12 + 37 + i * 49),
        unknown6: request.readUInt16LE(12 + 39 + i * 49),
        unknown7: request.readUInt16LE(12 + 41 + i * 49),
        feverBonus: request.readUInt16LE(12 + 43 + i * 49),
        unknown8: request.readUInt16LE(12 + 45 + i * 49),
        maxComboBonus: request.readUInt16LE(12 + 47 + i * 49)
      });
    }
    return {
      type: 'playResultScoreInput',
      data: {
        playerId: request.readUInt32LE(8),
        scoreList: scoreList,
        unknown: request.readUInt16LE(12 + 3 * 49)
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
  playerDataMusicListOutput: function (params, response) {
    if (!!response.hex) {
      return Buffer.from(response.hex, 'hex');
    }
    var result = Buffer.alloc(17);
    result.writeUInt8(response.mode, 8);
    result.writeUInt32LE(response.musicId, 9);
    result.writeUInt8(response.musicType, 13);
    result.writeUInt8(response.songStage, 14);
    result.writeUInt8(response.atStage, 15);
    result.writeUInt8(response.isNew, 16);
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
    var result = Buffer.alloc(130);
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
  }
};