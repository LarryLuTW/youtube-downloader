var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var getRS = require('./getRS');

var getIDFromUrl = function(youtubeUrl){
    return new Promise((resolve, reject) => {
        var url = 'http://www.youtube-mp3.org/a/pushItem/';
        var rs = getRS.getRSFromYoutubeUrl(youtubeUrl);
        var qs = {
            item: youtubeUrl,
            el: 'ma',
            bf: 'false',
            r: rs.r,
            s: rs.s
        };

        request.get({url: url, qs: qs}, function(err, res, body){
            if(err || res.statusCode != 200) throw err;
            resolve(body);
        });
    });
};

var getLinkFromID = function(id){
    return new Promise((resolve, reject) => {
        var url = 'http://www.youtube-mp3.org/a/itemInfo/';
        var rs = getRS.getRSFromID(id);
        var qs = {
            video_id: id,
            ac: 'www',
            t: 'grp',
            r: rs.r,
            s: rs.s
        }
        
        request.get({url: url, qs: qs}, function(err, res, body){
            if(err || res.statusCode != 200) throw err;
            body = body.substring(7).split(';')[0];
            var json = JSON.parse(body);

            var link = '';
            link += 'http://www.youtube-mp3.org/get?video_id=' + id;
            link += '&ts_create=' + json.ts_create + '&r=' + json.r + '&h2=' + json.h2;
            var s = getRS.getSFromDownloadUrl(link);
            link += '&s=' + s;

            resolve(link);
        });
    });
};

var getTitleFromUrl = function(youtubeUrl){
    return new Promise((resolve, reject) => {
        request.get({url: youtubeUrl}, function(err, res, body){
            if(err || res.statusCode != 200) throw err;
            var $ = cheerio.load(body);
            var title = $('#watch7-content meta').attr('content');
            resolve(title);
        });
    });
};


var downloadFromLink = function(link, title){
    return new Promise((resolve, reject) => {
        request(link).pipe(fs.createWriteStream(title + '.mp3')).on('close', function(){
            resolve('done');
        });
    });
};

var downloadFromYoutubeLink = function(youtubeLink){

    var getLink = getIDFromUrl(youtubeLink).then((id) => {
        console.log('get ID success');
        return getLinkFromID(id);
    }).then((downloadLink) => {
        console.log('get link success');
        return downloadLink;
    });

    var getTitle = getTitleFromUrl(youtubeLink).then((title) => {
        console.log('get title success');
        return title;
    });

    Promise.all([getLink, getTitle]).then((values) => {

        var downloadLink = values[0];
        var title = values[1];
        console.log('start download: ' + title);
        return downloadFromLink(downloadLink, title);

    }).then((finish) => {

        console.log('download complete');

    }).catch((err) => {

        console.log('there is some error:');
        console.log(err);
        throw err;

    });

};

module.exports = downloadFromYoutubeLink;

