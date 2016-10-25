var fs = require('fs');
var request = require('request');
var Promise: PromiseConstructor = require('bluebird');
var ProgressBar = require('progress');
var encode = require('./encode');

function getID(youtubeLink: string): string {
    var ID = youtubeLink.split('v=')[1].substr(0, 11);
    return ID;
}

async function getDownloadInfo(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var url = 'http://149.202.207.209/api/audio_link/normal/mp3/1/' + encode(id);
        var form = {
            vid: 'vqG50KnqwBcsBAfSqxHw4nuWHxR6AdmvLpUYNPKBhbxhezjoiANkGPLD3xXT80p1'
        };
        request({ url, form }, function (err, res, body) {
            if (err || res.statusCode != 200) return reject(err);
            try {
                var json = JSON.parse(body);
                var filename = json.filename;
                var downloadLink = 'http://149.202.207.209' + json.link;
                resolve({ downloadLink, filename });
            } catch (err) {
                return reject(err);
            }
        });
    });
}

async function getFileStream(downloadLink): Promise<any> {
    return new Promise((resolve, reject) => {
        var stream = request(downloadLink)
            .on('response', (res) => {
                resolve({ stream, contentLength: parseInt(res.headers['content-length'], 10) });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function download({ downloadLink, filename }): Promise<any> {
    var bar = null;
    return new Promise((resolve, reject) => {
        request(downloadLink)
            .on('response', res => {
                bar = new ProgressBar('downloading [:bar] :percent :etas', {
                    complete: '=',
                    incomplete: ' ',
                    width: 60,
                    total: parseInt(res.headers['content-length'], 10)
                });
            })
            .on('data', chunk => bar.tick(chunk.length))
            .pipe(fs.createWriteStream(filename))
            .on('finish', resolve)
            .on('error', err => reject(err));
    });
}

(async function () {

    var youtubeLink = process.argv[2];
    if (!youtubeLink) {
        console.log('usage: youtube-downloader https://www.youtube.com/watch?v=e-ORhEE9VVg');
        process.exit(1);
    }

    var id = getID(youtubeLink);
    var info = await getDownloadInfo(id);
    console.log(info.filename);
    await download(info);
    console.log('finish');

})().catch(err => console.log(err));
