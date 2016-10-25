'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var encode = require('./encode');
function getID(youtubeLink) {
    var ID = youtubeLink.split('v=')[1].substr(0, 11);
    return ID;
}
function getDownloadInfo(id) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            var url = 'http://149.202.207.209/api/audio_link/normal/mp3/1/' + encode(id);
                            var form = {
                                vid: 'vqG50KnqwBcsBAfSqxHw4nuWHxR6AdmvLpUYNPKBhbxhezjoiANkGPLD3xXT80p1'
                            };
                            request({ url: url, form: form }, function (err, res, body) {
                                if (err || res.statusCode != 200) return reject(err);
                                try {
                                    var json = JSON.parse(body);
                                    var filename = json.filename;
                                    var downloadLink = 'http://149.202.207.209' + json.link;
                                    resolve({ downloadLink: downloadLink, filename: filename });
                                } catch (err) {
                                    return reject(err);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
function download(_ref) {
    var downloadLink = _ref.downloadLink,
        filename = _ref.filename;

    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            request(downloadLink).pipe(fs.createWriteStream(filename)).on('finish', resolve).on('error', function (err) {
                                return reject(err);
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
(function () {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
        var youtubeLink, id, info;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        youtubeLink = process.argv[2];

                        if (!youtubeLink) {
                            console.log('node index.js [youtube link]');
                            process.exit(1);
                        }
                        id = getID(youtubeLink);
                        _context3.next = 5;
                        return getDownloadInfo(id);

                    case 5:
                        info = _context3.sent;

                        console.log('downloading ' + info.filename);
                        _context3.next = 9;
                        return download(info);

                    case 9:
                        console.log('finish');

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
})().catch(function (err) {
    return console.log(err);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiaW5kZXgudHMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwidGhyb3ciLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZnMiLCJyZXF1aXJlIiwicmVxdWVzdCIsImVuY29kZSIsImdldElEIiwieW91dHViZUxpbmsiLCJJRCIsInNwbGl0Iiwic3Vic3RyIiwiZ2V0RG93bmxvYWRJbmZvIiwiaWQiLCJ1cmwiLCJmb3JtIiwidmlkIiwiZXJyIiwicmVzIiwiYm9keSIsInN0YXR1c0NvZGUiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwiZmlsZW5hbWUiLCJkb3dubG9hZExpbmsiLCJsaW5rIiwiZG93bmxvYWQiLCJwaXBlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJvbiIsInByb2Nlc3MiLCJhcmd2IiwiY29uc29sZSIsImxvZyIsImV4aXQiLCJpbmZvIiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxhQUFRLFVBQUtBLFNBQWQsSUFBNEIsVUFBVUMsT0FBVixFQUFtQkMsVUFBbkIsRUFBK0JDLENBQS9CLEVBQWtDQyxTQUFsQyxFQUE2QztBQUNyRixXQUFPLEtBQUtELE1BQU1BLElBQUlFLE9BQVYsQ0FBTCxFQUF5QixVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN2RCxpQkFBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBRSxnQkFBSTtBQUFFQyxxQkFBS04sVUFBVU8sSUFBVixDQUFlRixLQUFmLENBQUw7QUFBOEIsYUFBcEMsQ0FBcUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLHVCQUFPSyxDQUFQO0FBQVk7QUFBRTtBQUMzRixpQkFBU0MsUUFBVCxDQUFrQkosS0FBbEIs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
