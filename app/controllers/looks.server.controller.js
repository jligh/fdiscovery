'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    seedrandom = require('seedrandom'),
	errorHandler = require('./errors.server.controller'),
	Look = mongoose.model('Look'),
	_ = require('lodash');

/**
 * Create a Look
 */
exports.create = function(req, res) {
	var look = new Look(req.body);
	look.user = req.user;

	look.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(look);
		}
	});
};

/**
 * Show the current Look
 */
exports.read = function(req, res) {
	res.jsonp(req.look);
};

/**
 * Update a Look
 */
exports.update = function(req, res) {
	var look = req.look ;

	look = _.extend(look , req.body);

	look.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(look);
		}
	});
};

/**
 * Delete an Look
 */
exports.delete = function(req, res) {
	var look = req.look ;

	look.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(look);
		}
	});
};

/**
 * List of Looks
 */
exports.list = function(req, res) {
    var cursor = {};
    var limit = 10;
    if (req.query.cursor) {
        var objId = mongoose.Types.ObjectId(req.query.cursor);
        cursor._id = {$gt: objId};
    }
	Look.find(cursor).limit(limit).exec(function(err, looks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(looks);
		}
	});
};

exports.listRandom = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var type = req.query.type || '';
    var seed = req.query.seed || 'test';

    var query = {};
    if (type) {
        query.type = type;
    }
    Look.find(query).select('_id').lean().exec(function(err, looks) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            /**
             * create randomness with pagination here...
             * doing it in code will obviously not scale, since all results are being returned, but it doesn't seem
             * like mongo has an equivalent to mysql's "order by rand". thought about just using mysql, but
             * mysql's "order by rand" also has it's own scale problems. another solution, though not random every
             * time, would be to store a random value in each document, and ordering by that field. It could be
             * periodically updated, so that the result order changes depending on when the user visits the site.
             */

            var indexStart = (page - 1) * limit;
            var indexEnd = indexStart + limit;
            if (indexStart > looks.length) {
                //too far
                res.jsonp([]);
            } else {
                //add a random value to each item, with a seed so that pages dont duplicate content
                var rng = seedrandom(seed);
                for (var i = 0; i < looks.length; i++) {
                    looks[i].rand = rng();
                }
                //sort values by random value and paginate
                looks.sort(function(a, b) { return a.rand - b.rand; });
                var ids = looks.slice(indexStart, indexEnd).map(function(o) {
                    return o._id;
                });
                //only got ids to save on memory space, now lets get the actual data
                Look.find({'_id' : {
                    '$in' : ids
                }}).populate('author').exec(function(err, results) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.jsonp(results);
                    }
                });
            }
        }
    });
};


/**
 * Look middleware
 */
exports.lookByID = function(req, res, next, id) { 
	Look.findById(id).populate('user', 'displayName').exec(function(err, look) {
		if (err) return next(err);
		if (! look) return next(new Error('Failed to load Look ' + id));
		req.look = look ;
		next();
	});
};

/**
 * Look authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.look.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
