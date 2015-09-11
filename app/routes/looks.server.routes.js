'use strict';

module.exports = function(app) {
	var looks = require('../../app/controllers/looks.server.controller');

	// Looks Routes
    app.route('/looksRandom')
        .get(looks.listRandom);

	app.route('/looks')
		.get(looks.list);

	app.route('/looks/:lookId')
		.get(looks.read);

	// Finish by binding the Look middleware
	app.param('lookId', looks.lookByID);
};
