var co = require('co');
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var utils = require('./src/utils');

var downloadFromLink = function(link, title){
    return new Promise((resolve, reject) => {
        request(link).pipe(fs.createWriteStream(title + '.mp3'))
            .on('close', () => resolve('done'))
            .on('error', (err) => reject(err));
    });
};

var download = function(url){
    co(function*(){
        var idPromise = utils.getIDFromUrl(url);
        var titlePromise = utils.getTitleFromUrl(url);

        var id = yield idPromise;
        console.log('get ID success');

        var link = yield utils.getLinkFromID(id);
        console.log('get link success');

        var title = yield titlePromise;
        console.log('get title success');

        console.log('start download:', title);
        yield downloadFromLink(link, title);
        console.log('download complete');
    }).catch(err => console.log(err));
};

module.exports = download;

