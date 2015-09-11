'use strict';

angular.module('lookbook').factory('looks', ['$http',
	function($http) {

        //set a seed for this session
        var seed = Math.random();
        seed = 'test';

		// Public API
		return {
            getRandomLooks: function(page, limit, type) {
                page = page || 1;
                limit = limit || 10;
                type = type || '';
                var params = {
                    page: page,
                    limit: limit,
                    type: type,
                    seed: seed
                };
                return $http.get('/looksRandom', {params: params}).then(function(res) {
                    return res.data;
                });
            }
		};
	}
]);