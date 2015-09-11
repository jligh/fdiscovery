'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	Look = mongoose.model('Look'),
	agent = request.agent(app);

/**
 * Globals
 */
var look;

/**
 * Look routes tests
 */
describe('Look CRUD tests', function() {
	beforeEach(function() {
        look = {
            title: 'Look Name'
        };
	});

	it('should be able to get a list of Looks', function(done) {
		// Create new Look model instance
		var lookObj = new Look(look);

		// Save the Look
		lookObj.save(function() {
			// Request Looks
			request(app).get('/looks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Look', function(done) {
		// Create new Look model instance
		var lookObj = new Look(look);

		// Save the Look
		lookObj.save(function() {
			request(app).get('/looks/' + lookObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', look.title);

					// Call the assertion callback
					done();
				});
		});
	});

	afterEach(function(done) {
		Look.remove().exec();
		done();
	});
});