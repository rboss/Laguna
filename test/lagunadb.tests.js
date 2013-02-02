
var db = require('../lagunadb').init();

describe('LagunaDb', function() {
	it('clears all matches', function(done) {

		db.insertMatch({id: 1300, name:"test"});
		db.clearMatches();
		db.findMatches(function(matches) {
			matches.length.should.equal(0);
			done();
		});
	});
});