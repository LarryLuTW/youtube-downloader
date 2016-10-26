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
var request = require('request');
var cheerio = require('cheerio');
module.exports = function () {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var currentVersion;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        currentVersion = require('../package.json').version;
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            var url = 'https://github.com/Larry850806/youtube-downloader/tags';
                            request(url, function (err, res, body) {
                                if (err || res.statusCode !== 200) {
                                    return reject(err);
                                }
                                var $ = cheerio.load(body);
                                var latestVersion = $('table.releases-tag-list a > span.tag-name').first().text();
                                if (currentVersion !== latestVersion) {
                                    console.log('New Version', latestVersion);
                                    console.log('update: npm install Larry850806/youtube-downloader --production -g');
                                    return resolve('need update');
                                }
                                resolve();
                            });
                        }));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrVmVyc2lvbi5qcyIsImNoZWNrVmVyc2lvbi50cyJdLCJuYW1lcyI6WyJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJ0aHJvdyIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJyZXF1ZXN0IiwicmVxdWlyZSIsImNoZWVyaW8iLCJtb2R1bGUiLCJleHBvcnRzIiwiY3VycmVudFZlcnNpb24iLCJ2ZXJzaW9uIiwidXJsIiwiZXJyIiwicmVzIiwiYm9keSIsInN0YXR1c0NvZGUiLCIkIiwibG9hZCIsImxhdGVzdFZlcnNpb24iLCJmaXJzdCIsInRleHQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFDQSxJQUFJQSxZQUFhLGFBQVEsVUFBS0EsU0FBZCxJQUE0QixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsQ0FBL0IsRUFBa0NDLFNBQWxDLEVBQTZDO0FBQ3JGLFdBQU8sS0FBS0QsTUFBTUEsSUFBSUUsT0FBVixDQUFMLEVBQXlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZELGlCQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFFLGdCQUFJO0FBQUVDLHFCQUFLTixVQUFVTyxJQUFWLENBQWVGLEtBQWYsQ0FBTDtBQUE4QixhQUFwQyxDQUFxQyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsdUJBQU9LLENBQVA7QUFBWTtBQUFFO0FBQzNGLGlCQUFTQyxRQUFULENBQWtCSixLQUFsQixFQUF5QjtBQUFFLGdCQUFJO0FBQUVDLHFCQUFLTixVQUFVVSxLQUFWLENBQWdCTCxLQUFoQixDQUFMO0FBQStCLGFBQXJDLENBQXNDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCx1QkFBT0ssQ0FBUDtBQUFZO0FBQUU7QUFDM0YsaUJBQVNGLElBQVQsQ0FBY0ssTUFBZCxFQUFzQjtBQUFFQSxtQkFBT0MsSUFBUCxHQUFjVixRQUFRUyxPQUFPTixLQUFmLENBQWQsR0FBc0MsSUFBSU4sQ0FBSixDQUFNLFVBQVVHLE9BQVYsRUFBbUI7QUFBRUEsd0JBQVFTLE9BQU9OLEtBQWY7QUFBd0IsYUFBbkQsRUFBcURRLElBQXJELENBQTBEVCxTQUExRCxFQUFxRUssUUFBckUsQ0FBdEM7QUFBdUg7QUFDL0lILGFBQUssQ0FBQ04sWUFBWUEsVUFBVWMsS0FBVixDQUFnQmpCLE9BQWhCLEVBQXlCQyxVQUF6QixDQUFiLEVBQW1EUyxJQUFuRCxFQUFMO0FBQ0gsS0FMTSxDQUFQO0FBTUgsQ0FQRDtBQ0RBLElBQU9RLFVBQU9DLFFBQVcsU0FBWCxDQUFkO0FBQ0EsSUFBT0MsVUFBT0QsUUFBVyxTQUFYLENBQWQ7QUFFQUUsT0FBQUMsT0FBQSxHQUFTLFlBQUE7QURTTCxXQUFPdkIsVUFBVSxJQUFWLEVBQWdCLEtBQUssQ0FBckIsRUFBd0IsS0FBSyxDQUE3Qiw2QkFBZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDUm5Dd0Isc0NEUW1DLEdDUlZKLFFBQVEsaUJBQVIsRUFBMkJLLE9EUWpCO0FBQUEseURDUGhDLElBQUlwQixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQWdCO0FBQy9CLGdDQUFJbUIsTUFBTSx3REFBVjtBQUNBUCxvQ0FBUU8sR0FBUixFQUFhLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYLEVBQWU7QUFDeEIsb0NBQUlGLE9BQU9DLElBQUlFLFVBQUosS0FBbUIsR0FBOUIsRUFBbUM7QUFDL0IsMkNBQU92QixPQUFPb0IsR0FBUCxDQUFQO0FBQ0g7QUFDRCxvQ0FBSUksSUFBSVYsUUFBUVcsSUFBUixDQUFhSCxJQUFiLENBQVI7QUFDQSxvQ0FBSUksZ0JBQWdCRixFQUFFLDJDQUFGLEVBQStDRyxLQUEvQyxHQUF1REMsSUFBdkQsRUFBcEI7QUFDQSxvQ0FBSVgsbUJBQW1CUyxhQUF2QixFQUFzQztBQUNsQ0csNENBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCSixhQUEzQjtBQUNBRyw0Q0FBUUMsR0FBUixDQUFZLG9FQUFaO0FBQ0EsMkNBQU8vQixRQUFRLGFBQVIsQ0FBUDtBQUNIO0FBQ0RBO0FBQ0gsNkJBWkQ7QUFhSCx5QkFmTSxDRE9nQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFoQyxFQUFQO0FDU0gsQ0FsQkQiLCJmaWxlIjoiY2hlY2tWZXJzaW9uLmpzIiwic291cmNlUm9vdCI6InNyYyJ9
