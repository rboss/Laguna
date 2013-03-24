var _ = require('underscore');

describe('webapi', function() {
	var db = require('../lagunadb').init(27999);
	var webapi = require('../webapi');

	describe('getHeroes', function() {
		it('should return heroes list with id, name and localized name', function(done) {
			webapi.getHeroes(function(heroes) {

				heroes[0].should.have.property('id');
				heroes[0].should.have.property('name');
				heroes[0].should.have.property('localized_name');
				done();
			});
		});
		it('Anti-Mage should have id 1', function (done) {
			webapi.getHeroes(function(heroes) {
				var hero = _.find(heroes, function(hero){
					return hero.id === 1;
				});	
				hero.id.should.equal(1);
				hero.localized_name.should.equal("Anti-Mage");

				done();
			});
		});
	});
});