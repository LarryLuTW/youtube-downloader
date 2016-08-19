var utils = require('../src/utils');
var should = require('should')

describe('utils', function(){
    describe('#getIDFromUrl()', function(){
        it('should get correct ID', function(done){
            var url = 'https://www.youtube.com/watch?v=e-ORhEE9VVg';
            this.timeout(10000); // timeout 10 sec
            utils.getIDFromUrl(url).then(id => {
                id.should.equal('e-ORhEE9VVg');
                done();
            }).catch(err => {
                should.not.exist(err);
                console.log(err);
                done();
            })
        })
    })

    describe('#getLinkFromID', function(){
        it('should not get error when getting link from id', function(done){
            this.timeout(10000); // timeout 10 sec
            var id = 'e-ORhEE9VVg';
            utils.getLinkFromID(id).then(link => {
                should.exist(link);
                done();
            }).catch(function(err){
                should.not.exist(err);
                console.log(err);
                done();
            });
        })
    })

    describe('#getTitleFromUrl', function(){
        it('should get correct title', function(done){
            this.timeout(10000); // timeout 10 sec
            var url = 'https://www.youtube.com/watch?v=e-ORhEE9VVg';
            utils.getTitleFromUrl(url).then(title => {
                title.should.equal('Taylor Swift - Blank Space');
                done();
            }).catch(err => {
                should.not.exist(err);
                console.log(err);
                done();
            })
        })
    })
})


