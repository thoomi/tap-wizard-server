var should = require("should");
var util   = require('../../server/core/core_util.js');

describe('CORE.util', function() {
    describe('#createRandomNumber', function() {
        it('should generate a random number between _low and _high boundaries', function() {
            var randomNumber = util.createRandomNumber(5, 20);
            randomNumber.should.be.above(4);
            randomNumber.should.be.below(21);

            var randomNumber = util.createRandomNumber(1, 2);
            randomNumber.should.be.above(0);
            randomNumber.should.be.below(3);

            var randomNumber = util.createRandomNumber(-5, 3);
            randomNumber.should.be.above(-6);
            randomNumber.should.be.below(4);

            var randomNumber = util.createRandomNumber(-101, -50);
            randomNumber.should.be.above(-102);
            randomNumber.should.be.below(-49);
        });
    });
});
