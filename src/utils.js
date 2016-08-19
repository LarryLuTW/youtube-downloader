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
            if(err || res.statusCode != 200)
                return reject(err);
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
            if(err || res.statusCode != 200)
                return reject(err)

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
            if(err || res.statusCode != 200)
                return reject(err);

            var $ = cheerio.load(body);
            var title = $('#watch7-content meta').attr('content');
            resolve(title);
        });
    });
};

module.exports.getIDFromUrl = getIDFromUrl;
module.exports.getLinkFromID = getLinkFromID;
module.exports.getTitleFromUrl = getTitleFromUrl;

