'use strict';

//Setting up route
angular.module('lookbook').config(['$stateProvider',
	function($stateProvider) {
		// Lookbook state routing
		$stateProvider.
		state('lookbook', {
			url: '/lookbook/:type',
			templateUrl: 'modules/lookbook/views/lookbook.client.view.html',
            controller: 'LookbookController',
            resolve: {
                theLooks: ['looks', 'lookConfig', '$stateParams', function(looks, lookConfig, $stateParams) {
                    return looks.getRandomLooks(1, lookConfig.limit, $stateParams.type);
                }]
            }
		});
	}
]);