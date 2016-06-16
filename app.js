#!/usr/bin/env node
var youtubeDownloader = require('./index');

var youtubeLink = process.argv[2];

if(!youtubeLink){
    console.log('usage: youtube-downloader https://www.youtube.com/watch?v=e-ORhEE9VVg');
    return;
}

youtubeDownloader(youtubeLink);
