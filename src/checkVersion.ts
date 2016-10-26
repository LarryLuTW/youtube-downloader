import request = require('request');
import cheerio = require('cheerio');

export = async function () {
    var currentVersion: string = require('../package.json').version;
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
}