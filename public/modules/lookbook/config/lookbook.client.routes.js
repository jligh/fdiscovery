'use strict';

//Setting up route
angular.module('lookbook').config(['$stateProvider',
	function($stateProvider) {
		// Lookbook state routing
		$stateProvider.
		state('lookbook', {
			url: '/lookbook',
			templateUrl: 'modules/lookbook/views/lookbook.client.view.html',
            controller: 'LookbookController',
            resolve: {
                theLooks: ['looks', function(looks) {
                    return looks.getRandomLooks();
                }]
            }
		});
	}
]);