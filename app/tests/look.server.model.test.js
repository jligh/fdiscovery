'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Look = mongoose.model('Look');

/**
 * Globals
 */
var look;

/**
 * Unit tests
 */
describe('Look Model Unit Tests:', function() {
	beforeEach(function() {
        look = new Look({
            title: 'a title'
        });
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return look.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Look.remove().exec();

		done();
	});
});