"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const request = require('request');
const cheerio = require('cheerio');
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        var currentVersion = require('../package.json').version;
        return new Promise((resolve, reject) => {
            var url = 'https://github.com/Larry850806/youtube-downloader/tags';
            request(url, (err, res, body) => {
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
        });
    });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFPLE9BQU8sV0FBVyxTQUFTLENBQUMsQ0FBQztBQUNwQyxNQUFPLE9BQU8sV0FBVyxTQUFTLENBQUMsQ0FBQztBQUVwQyxpQkFBUzs7UUFDTCxJQUFJLGNBQWMsR0FBVyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsSUFBSSxHQUFHLEdBQUcsd0RBQXdELENBQUM7WUFDbkUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtnQkFDeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEYsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7b0JBQ2xGLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBLENBQUEiLCJmaWxlIjoiY2hlY2tWZXJzaW9uLmpzIiwic291cmNlUm9vdCI6InNyYyJ9
