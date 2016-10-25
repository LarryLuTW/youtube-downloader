var fs = require('fs');
var request = require('request');
var Promise: PromiseConstructor = require('bluebird');
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
        request({ url, form }, function(err, res, body){
            if(err || res.statusCode != 200) return reject(err);
            try {
                var json = JSON.parse(body);
                var filename = json.filename;
                var downloadLink = 'http://149.202.207.209' + json.link;
                resolve({ downloadLink, filename });
            } catch(err) {
                return reject(err);
            }
        });
    });
}

async function download({ downloadLink, filename }): Promise<any> {
    return new Promise((resolve, reject) => {
        request(downloadLink)
            .pipe(fs.createWriteStream(filename))
            .on('finish', resolve)
            .on('error', err => reject(err));
    });
}

(async function(){
    
    var youtubeLink = process.argv[2];
    if(!youtubeLink){
        console.log('node index.js [youtube link]');
        process.exit(1);
    }
     
    var id = getID(youtubeLink);
    var info = await getDownloadInfo(id);
    console.log('downloading ' + info.filename);
    await download(info);
    console.log('finish');

})().catch(err => console.log(err));
