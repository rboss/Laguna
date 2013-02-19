
describe('LagunaDB', function() {
	var db = require('../lagunadb').init();

	beforeEach(function() {
		db.clearMatches();
		db.insertMatch({ match_id: 1400, name:"test1" });
		db.insertMatch({ match_id: 1401, name:"test2" });
		db.insertMatch({ match_id: 1402, name:"test3" });
	});
	
	describe('clearMatches', function() {

		beforeEach(function() {			
			db.clearMatches();
		});

		it('clears all matches', function(done) {			
			db.findMatches(function(matches) {
				matches.length.should.equal(0);
				done();
			});			
		});
	});
	describe('insertMatch', function() {

		it('should increase match count with one', function(done) {
			db.insertMatch({ match_id: 1403, name:"test3" });
			db.findMatches(function(matches) {
				console.log(matches.length);
				matches.length.should.equal(4);
				done();
			});
		});
		it('should not increase match count if insert with existing match_id', function(done) {
			db.insertMatch({ match_id: 1400, name:"test4" });
			db.findMatches(function(matches) {
				console.log(matches.length);
				matches.length.should.equal(3);
				done();
			});
		});		
		it('should return error code 11000 [duplicate key error index] if insert with existing match_id', function(done) {
			db.insertMatch({ match_id: 1400, name:"test4" }, function(err) {
				err.code.should.equal(11000);
				done();
			});

		});		
	});	
	describe('findMatches', function() {
		it('should find all matches', function(done) {
			db.findMatches(function(matches) {
				matches.length.should.equal(3);
				done();
			});
		});
	});	
});