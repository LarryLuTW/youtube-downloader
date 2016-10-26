"use strict";

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
var ProgressBar = require('progress');
var encode = require('./encode');
var checkVersion = require('./checkVersion');
Promise = require('bluebird');
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
function getFileStream(downloadLink) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            var stream = request(downloadLink).on('response', function (res) {
                                resolve({ stream: stream, contentLength: parseInt(res.headers['content-length'], 10) });
                            }).on('error', function (err) {
                                reject(err);
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
function download(_ref) {
    var downloadLink = _ref.downloadLink,
        filename = _ref.filename;

    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
        var bar;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        bar = null;
                        return _context3.abrupt('return', new Promise(function (resolve, reject) {
                            request(downloadLink).on('response', function (res) {
                                bar = new ProgressBar('downloading [:bar] :percent :etas', {
                                    complete: '=',
                                    incomplete: ' ',
                                    width: Math.floor(process.stdout.columns / 3),
                                    total: parseInt(res.headers['content-length'], 10)
                                });
                            }).on('data', function (chunk) {
                                return bar.tick(chunk.length);
                            }).pipe(fs.createWriteStream(filename)).on('finish', resolve).on('error', function (err) {
                                return reject(err);
                            });
                        }));

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
}
(function () {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
        var youtubeLink, updateMessage, id, info;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        youtubeLink = process.argv[2];

                        if (!youtubeLink) {
                            console.log('usage: youtube-downloader https://www.youtube.com/watch?v=e-ORhEE9VVg');
                            process.exit(1);
                        }
                        _context4.next = 4;
                        return checkVersion();

                    case 4:
                        updateMessage = _context4.sent;

                        if (updateMessage) process.exit(0);
                        id = getID(youtubeLink);
                        _context4.next = 9;
                        return getDownloadInfo(id);

                    case 9:
                        info = _context4.sent;

                        console.log(info.filename);
                        _context4.next = 13;
                        return download(info);

                    case 13:
                        console.log('finish');

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
})().catch(function (err) {
    return console.log(err);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiaW5kZXgudHMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwidGhyb3ciLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZnMiLCJyZXF1aXJlIiwicmVxdWVzdCIsIlByb2dyZXNzQmFyIiwiZW5jb2RlIiwiY2hlY2tWZXJzaW9uIiwiZ2V0SUQiLCJ5b3V0dWJlTGluayIsIklEIiwic3BsaXQiLCJzdWJzdHIiLCJnZXREb3dubG9hZEluZm8iLCJpZCIsInVybCIsImZvcm0iLCJ2aWQiLCJlcnIiLCJyZXMiLCJib2R5Iiwic3RhdHVzQ29kZSIsImpzb24iLCJKU09OIiwicGFyc2UiLCJmaWxlbmFtZSIsImRvd25sb2FkTGluayIsImxpbmsiLCJnZXRGaWxlU3RyZWFtIiwic3RyZWFtIiwib24iLCJjb250ZW50TGVuZ3RoIiwicGFyc2VJbnQiLCJoZWFkZXJzIiwiZG93bmxvYWQiLCJiYXIiLCJjb21wbGV0ZSIsImluY29tcGxldGUiLCJ3aWR0aCIsIk1hdGgiLCJmbG9vciIsInByb2Nlc3MiLCJzdGRvdXQiLCJjb2x1bW5zIiwidG90YWwiLCJ0aWNrIiwiY2h1bmsiLCJsZW5ndGgiLCJwaXBlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJhcmd2IiwiY29uc29sZSIsImxvZyIsImV4aXQiLCJ1cGRhdGVNZXNzYWdlIiwiaW5mbyIsImNhdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFDQSxJQUFJQSxZQUFhLGFBQVEsVUFBS0EsU0FBZCxJQUE0QixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsQ0FBL0IsRUFBa0NDLFNBQWxDLEVBQTZDO0FBQ3JGLFdBQU8sS0FBS0QsTUFBTUEsSUFBSUUsT0FBVixDQUFMLEVB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QUFPWixTQUFTYixJQUFJYyxPQUFKLENBQVksZ0JBQVosQ0FBVCxFQUF3QyxFQUF4QztBQUpnRCxpQ0FBckQsQ0FBTjtBQU1ILDZCQVJMLEVBU0tILEVBVEwsQ0FTUSxNQVRSLEVBU2dCO0FBQUEsdUNBQVNLLElBQUlVLElBQUosQ0FBU0MsTUFBTUMsTUFBZixDQUFUO0FBQUEsNkJBVGhCLEVBVUtDLElBVkwsQ0FVVTlDLEdBQUcrQyxpQkFBSCxDQUFxQnhCLFFBQXJCLENBVlYsRUFXS0ssRUFYTCxDQVdRLFFBWFIsRUFXa0J6QyxPQVhsQixFQVlLeUMsRUFaTCxDQVlRLE9BWlIsRUFZaUI7QUFBQSx1Q0FBT3hDLE9BQU80QixHQUFQLENBQVA7QUFBQSw2QkFaakI7QUFhSCx5QkFkTSxDRFVnQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFoQyxFQUFQO0FDS0g7QUFFRCxDQUFDLFlBQUE7QURhRyxXQUFPbkMsVUFBVSxJQUFWLEVBQWdCLEtBQUssQ0FBckIsRUFBd0IsS0FBSyxDQUE3Qiw2QkFBZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDWG5DMEIsbUNEV21DLEdDWHJCZ0MsUUFBUVMsSUFBUixDQUFhLENBQWIsQ0RXcUI7O0FDVnZDLDRCQUFJLENBQUN6QyxXQUFMLEVBQWtCO0FBQ2QwQyxvQ0FBUUMsR0FBUixDQUFZLHVFQUFaO0FBQ0FYLG9DQUFRWSxJQUFSLENBQWEsQ0FBYjtBQUNIO0FET3NDO0FBQUEsK0JDTGI5QyxjREthOztBQUFBO0FDTG5DK0MscUNES21DOztBQ0p2Qyw0QkFBSUEsYUFBSixFQUFtQmIsUUFBUVksSUFBUixDQUFhLENBQWI7QUFFZnZDLDBCREVtQyxHQ0Y5Qk4sTUFBTUMsV0FBTixDREU4QjtBQUFBO0FBQUEsK0JDRHRCSSxnQkFBZ0JDLEVBQWhCLENEQ3NCOztBQUFBO0FDRG5DeUMsNEJEQ21DOztBQ0F2Q0osZ0NBQVFDLEdBQVIsQ0FBWUcsS0FBSzlCLFFBQWpCO0FEQXVDO0FBQUEsK0JDQ2pDUyxTQUFTcUIsSUFBVCxDRERpQzs7QUFBQTtBQ0V2Q0osZ0NBQVFDLEdBQVIsQ0FBWSxRQUFaOztBREZ1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFoQyxFQUFQO0FDSUgsQ0FqQkQsSUFpQktJLEtBakJMLENBaUJXO0FBQUEsV0FBT0wsUUFBUUMsR0FBUixDQUFZbEMsR0FBWixDQUFQO0FBQUEsQ0FqQlgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjIn0=
