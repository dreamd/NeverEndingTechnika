'use strict';

var q = require('q');
var net = require('net');
var fs = require('fs');
var moment = require('moment');
var Common = require('core/common.js');
var SERVER_CONFIG = require('config.js');
var Storage = require('core/storage.js');
var DMThelper = require('neowiz/dmt/helper.js');
var DMTsecretController = require('neowiz/dmt/controller/secret.js');
var DMT_CONFIG = require('neowiz/dmt/config.js');

var passwordTable = Buffer.from(DMT_CONFIG.ENCRTPTION_KEY_MAP, 'hex');
var serverDecrypt = function (value, params) {
  var from = 0;
  var resultList = [];
  while (true) {
    if (from >= value.length) {
      break;
    }
    var packageType = '';
    if (!params.isDebug) {
      packageType = serverDecryptCore(value.slice(from, from + 8), params).slice(0, 1).toString('hex');
    } else {
      packageType = value.slice(from, from + 8).slice(0, 1).toString('hex');
    }
    if (!params.config.PACKAGE_TYPE_SIZE[packageType]) {
      break;
    }
    if (params.config.PACKAGE_TYPE_SIZE[packageType] > 8) {
      serverDecryptCore(value.slice(from + 8, from + params.config.PACKAGE_TYPE_SIZE[packageType]), params, false);
    }
    resultList.push(value.slice(from, from + params.config.PACKAGE_TYPE_SIZE[packageType]));
    from += params.config.PACKAGE_TYPE_SIZE[packageType];
    params.decryptIndex = ((0x7 * params.decryptIndex ^ 0x93783891) + 0x100000000) % 0x100000000;
  }
  return resultList;
};
var serverDecryptCore = function (value, params, isCheck = true) {
  if (params.isDebug) {
    return value;
  }
  var keyIndex = ((((0x0A030110 ^ params.decryptIndex) + 0x100000000) % 0x100000000) % 252) * 4;
  var decryptByteList = function (byteList) {
    var seed = 0xC6EF3720;
    for (var i = 0; i < 0x20; i++) {
      byteList[1] = (byteList[1] - ((passwordTable.readUInt32LE(keyIndex + 12) + (byteList[0] >>> 5)) ^ (seed + byteList[0]) ^ (passwordTable.readUInt32LE(keyIndex + 8) + 16 * byteList[0])) + 0x100000000) % 0x100000000;
      byteList[0] = (byteList[0] - ((passwordTable.readUInt32LE(keyIndex + 4) + (byteList[1] >>> 5)) ^ (seed + byteList[1]) ^ (passwordTable.readUInt32LE(keyIndex) + 16 * byteList[1])) + 0x100000000) % 0x100000000;
      seed = (seed + 0x61C88647 + 0x100000000) % 0x100000000;
    }
    return byteList;
  };
  var decryptByteData = function (byte, index) {
    return ((passwordTable.readUInt8(keyIndex) + index) % 256) ^ byte;
  };
  if (!params.noEncryption) {
    var doCount = Math.floor(value.length / 8);
    for (var i = 0; i < doCount; i++) {
        var decryptedByteList = decryptByteList([value.readUInt32LE(i * 8), value.readUInt32LE(i * 8 + 4)]);
        value.writeUInt32LE(decryptedByteList[0], i * 8);
        value.writeUInt32LE(decryptedByteList[1], i * 8 + 4);
    }
    var lastCount = value.length % 8;
    var startPosition = doCount * 8;
    for (var i = 0; i < lastCount; i++) {
      value.writeUInt8(decryptByteData(value.readUInt8(startPosition + i), i), startPosition + i);
    }
  }
  return value;
};
var serverEncrypt = function (value, params) {
  var keyIndex = ((((0x0A030110 ^ params.encryptIndex) + 0x100000000) % 0x100000000) % 252) * 4;
  params.encryptIndex = ((0x1F * params.encryptIndex ^ 0xAABBCCDE) + 0x100000000) % 0x100000000;
  if ((params.seed === null) && value.length > 8) {
    params.seed = value.readUInt32LE(8);
    params.decryptIndex = ((0x7 * params.seed ^ 0x93783891) + 0x100000000) % 0x100000000;
    params.encryptIndex = ((0x1F * params.seed ^ 0xAABBCCDE) + 0x100000000) % 0x100000000;
  }
  var encryptByteList = function (byteList) {
    var seed = 0;
    for (var i = 0; i < 0x20; i++) {
      seed = (seed - 0x61C88647 + 0x100000000) % 0x100000000;
      byteList[0] = (byteList[0] + ((passwordTable.readUInt32LE(keyIndex + 4) + (byteList[1] >>> 5)) ^ (seed + byteList[1]) ^ (passwordTable.readUInt32LE(keyIndex) + 16 * byteList[1])) + 0x100000000) % 0x100000000;
      byteList[1] = (byteList[1] + ((passwordTable.readUInt32LE(keyIndex + 12) + (byteList[0] >>> 5)) ^ (seed + byteList[0]) ^ (passwordTable.readUInt32LE(keyIndex + 8) + 16 * byteList[0])) + 0x100000000) % 0x100000000;
    }
    return byteList;
  };
  var encryptByteData = function (byte, index) {
    return ((passwordTable.readUInt8(keyIndex) + index) % 256) ^ byte;
  };
  if (!params.noEncryption) {
    var doCount = Math.floor(value.length / 8);
    for (var i = 0; i < doCount; i++) {
      var encryptedByteList = encryptByteList([value.readUInt32LE(i * 8), value.readUInt32LE(i * 8 + 4)]);
      value.writeUInt32LE(encryptedByteList[0], i * 8);
      value.writeUInt32LE(encryptedByteList[1], i * 8 + 4);
    }
    var lastCount = value.length % 8;
    if (lastCount > 0) {
      var startPosition = doCount * 8;
      for (var i = 0; i < lastCount; i++) {
        value.writeUInt8(encryptByteData(value.readUInt8(startPosition + i), i), startPosition + i);
      }
    }
  }
  return value;
};

module.exports = {
  syncMusicDB: function () {
    var versionList = [];
    var actionIndex = 0;
    for (var i = DMT_CONFIG.OLDEST_VERSION; i <= DMT_CONFIG.NEWEST_VERSION; i++) {
      versionList.push(i);
    }
    var updateMusicList = function () {
      if (actionIndex >= versionList.length) {
        return q.when();
      }
      var version = versionList[actionIndex];
      var path = Storage.globalPath + '/resource/dmt/dmt' + version + '/discstock.csv';
      var musicList = [];
      var fileData = fs.readFileSync(path, {encoding:'utf16le'});
      var fileList = fileData.split("\n");
      for (var i = 1; i < fileList.length; i++) {
        var data = fileList[i].split("\t");
        if (!data[0]) {
          continue;
        }
        if (data[2].substring(0, 1) === '"') {
          data[2] = data[2].substring(1, data[2].length - 1);
        }
        if (data[4].substring(0, 1) === '"') {
          data[4] = data[2].substring(1, data[2].length - 1);
        }
        if (version === 2) {
          musicList.push([
            version,
            parseInt(data[0], 10),
            data[2],
            data[4],
            parseInt(data[13], 10),
            parseInt(data[17], 10),
            parseInt(data[18], 10),
            parseInt(data[19], 10),
            parseInt(data[20], 10)
          ]);
        } else {
          musicList.push([
            version,
            parseInt(data[0], 10),
            data[2],
            data[4],
            parseInt(data[10], 10),
            parseInt(data[14], 10),
            parseInt(data[15], 10),
            parseInt(data[16], 10),
            parseInt(data[17], 10)
          ]);
        }
      } 
      return DMTsecretController.updateList(musicList, version).then (function () {
        actionIndex++;
        return updateMusicList();
      });
    };
    DMTsecretController.fixList().then(function () { 
      updateMusicList();
    });
  },
  actionPath: function (type) {
    return global.appPath + 'neowiz/dmt/controller/servlet.js';
  },
  moduleFolder: function () {
    return global.appPath + 'neowiz/dmt/controller';
  },
  action: function (socket, inputData) {
    q.when().then(function () {
      return module.exports.module[socket.params.method](socket, inputData);
    }).then(function (resultList) {
      var encryptResponseList = [];
      var decryptResponseList = [];
      for (var i = 0; i < resultList.length; i++) {
        decryptResponseList.push(resultList[i].toString('hex'));
        var encryptData = serverEncrypt(resultList[i], socket.params);
        encryptResponseList.push(encryptData.toString('hex'));
        socket.write(encryptData, function(error) {});
      }
      var currentTime = moment().format('YYYY-MM-DD HH:mm:ss Z');
      var information = {
        time: currentTime,
        gameData: socket.gameData,
        params: {
          module: socket.params.module,
          controller: socket.params.controller,
          method: socket.params.method
        },
        request: {
          inputEncrypt: socket.inputEncrypt,
          inputDecrypt: socket.inputDecrypt,
          output: socket.requestOutput
        },
        response: {
          input: socket.responseInput,
          outputEncrypt: encryptResponseList,
          outputDecrypt: decryptResponseList
        }
      };
      Common.console('SUCCESS', 'dmt' + socket.params.version + '/' + socket.params.method, information);
    }).catch(function(error) {
      var currentTime = moment().format('YYYY-MM-DD HH:mm:ss Z');
      var information = {
        error: {
          type: !!error.type ? error.type : 'unknown',
          code: !!error.errorCode ? error.errorCode : 'unknown'
        },
        time: currentTime,
        gameData: socket.gameData,
        params: {
          module: socket.params.module,
          controller: socket.params.controller,
          method: socket.params.method
        },
        request: {
          inputEncrypt: socket.inputEncrypt,
          inputDecrypt: socket.inputDecrypt,
          output: socket.requestOutput
        }
      };
      Common.error({
        req: {
          param: socket.params
        }
      }, 'dmt' + socket.params.version + '/' + socket.params.method, 'dmt', information);
    });
  },
  module: null,
  server: function () {
    var modulePath = module.exports.moduleFolder();
    module.exports.module = require(module.exports.actionPath());
    return net.createServer(function (socket) {
      var serverData = socket.server._connectionKey.split('::');
      var port = parseInt(serverData[serverData.length - 1], 10);
      var version = port % 10;
      socket.gameData = Common.gameData('DMT', version === 1 ? DMT_CONFIG.DEBUG_VERSION : version);
      var isDebug = version === 1;
      socket.setKeepAlive(true);
      socket.params = {
        decryptIndex: 0,
        encryptIndex: 0,
        seed: null,
        module: 'dmt',
        controller: 'servlet',
        method: '',
        version: socket.gameData.version,
        isDebug: isDebug,
        config: DMThelper.config(socket.gameData.version),
        noEncryption: port === SERVER_CONFIG.PORT.DMT2KR
      };
      socket.params.method = 'handshakeReq';
      if (!socket.params.isDebug) {
        module.exports.action(socket, [Buffer.alloc(8)]);
      }
      socket.on('data', function (request) {
        if (socket.params.isDebug) {
          var requestData = request.toString('utf8').replace(/ /g, '').split("\r\n\r\n");
          request = Buffer.from(requestData[1].replace(/\s+/g, ''), 'hex');
        }
        socket.inputEncrypt = Buffer.alloc(request.length);
        request.copy(socket.inputEncrypt);
        socket.inputEncrypt = socket.inputEncrypt.toString('hex');
        var requestList = serverDecrypt(request, socket.params);
        socket.inputDecrypt = [];
        for (var i = 0; i < requestList.length; i++) {
          socket.inputDecrypt.push(requestList[i].toString('hex'));
        }
        socket.params.method = socket.params.config.PACKAGE_TYPE_TO_API[requestList[0].slice(0, 1).toString('hex')];
        module.exports.action(socket, requestList);
      });
      socket.on('error', function() {});
      socket.on('end', function() {});
    });
  },
};
