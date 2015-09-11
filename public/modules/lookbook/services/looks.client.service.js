'use strict';

angular.module('lookbook').factory('looks', ['$http',
	function($http) {

        //set a seed for this session
        var seed = Math.random();
        seed = 'test';

		// Public API
		return {
            getRandomLooks: function(page, limit) {
                page = page || 1;
                limit = limit || 10;
                var params = {
                    page: page,
                    limit: limit,
                    seed: seed
                };
                return $http.get('/looksRandom', {params: params}).then(function(res) {
                    return res.data;
                });
            }
		};
	}
]);