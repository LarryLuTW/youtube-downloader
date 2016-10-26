"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const request = require('request');
const ProgressBar = require('progress');
const encode = require('./encode');
const checkVersion = require('./checkVersion');
Promise = require('bluebird');
function getID(youtubeLink) {
    var ID = youtubeLink.split('v=')[1].substr(0, 11);
    return ID;
}
function getDownloadInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var url = 'http://149.202.207.209/api/audio_link/normal/mp3/1/' + encode(id);
            var form = {
                vid: 'vqG50KnqwBcsBAfSqxHw4nuWHxR6AdmvLpUYNPKBhbxhezjoiANkGPLD3xXT80p1'
            };
            request({ url, form }, function (err, res, body) {
                if (err || res.statusCode != 200)
                    return reject(err);
                try {
                    var json = JSON.parse(body);
                    var filename = json.filename;
                    var downloadLink = 'http://149.202.207.209' + json.link;
                    resolve({ downloadLink, filename });
                }
                catch (err) {
                    return reject(err);
                }
            });
        });
    });
}
function getFileStream(downloadLink) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var stream = request(downloadLink)
                .on('response', (res) => {
                resolve({ stream, contentLength: parseInt(res.headers['content-length'], 10) });
            })
                .on('error', (err) => {
                reject(err);
            });
        });
    });
}
function download({ downloadLink, filename }) {
    return __awaiter(this, void 0, void 0, function* () {
        var bar = null;
        return new Promise((resolve, reject) => {
            request(downloadLink)
                .on('response', res => {
                bar = new ProgressBar('downloading [:bar] :percent :etas', {
                    complete: '=',
                    incomplete: ' ',
                    width: Math.floor(process.stdout.columns / 3),
                    total: parseInt(res.headers['content-length'], 10)
                });
            })
                .on('data', chunk => bar.tick(chunk.length))
                .pipe(fs.createWriteStream(filename))
                .on('finish', resolve)
                .on('error', err => reject(err));
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        var youtubeLink = process.argv[2];
        if (!youtubeLink) {
            console.log('usage: youtube-downloader https://www.youtube.com/watch?v=e-ORhEE9VVg');
            process.exit(1);
        }
        var updateMessage = yield checkVersion();
        if (updateMessage)
            process.exit(0);
        var id = getID(youtubeLink);
        var info = yield getDownloadInfo(id);
        console.log(info.filename);
        yield download(info);
        console.log('finish');
    });
})().catch(err => console.log(err));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBbUMsRUFBRTtvQkFDdkQsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQU8sT0FBTyxDQUFDLE1BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQ3JELENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztpQkFDRCxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDcEMsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7aUJBQ3JCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBRUQsQ0FBQzs7UUFFRyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUVBQXVFLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxJQUFJLGFBQWEsR0FBRyxNQUFNLFlBQVksRUFBRSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLE1BQU0sZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFMUIsQ0FBQztDQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6InNyYyJ9
