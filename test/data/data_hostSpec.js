var should = require('should');
var Host = require('../../server/data/data_host.js');


describe('DATA.Host', function () {
	var host = new Host({id: 567});

	describe('#getId()', function() {
		it('should return the same id as specified during construction', function() {
			host.getId().should.equal(567);
		});
	});
});