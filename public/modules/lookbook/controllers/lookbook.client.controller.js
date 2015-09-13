'use strict';

angular.module('lookbook').controller('LookbookController', ['$scope', '$stateParams', 'theLooks', 'looks', 'lookConfig', '$window',
	function($scope, $stateParams, theLooks, looks, lookConfig, $window) {

        $window.scrollTo(0, 0);

        $scope.looks = theLooks;

        //disable infinite scroll while request in progress or at end of results
        $scope.disableScrollCheck = false;
        var page = 1;

        /* function to load next page of results for inf scroll */
        $scope.loadNext = function() {
          if ($scope.disableScrollCheck) {
              return;
          }
          $scope.disableScrollCheck = true;
          looks.getRandomLooks(page + 1, lookConfig.limit, $stateParams.type).then(function(moreLooks) {
              if (moreLooks.length) {
                  page++;
                  $scope.looks = $scope.looks.concat(moreLooks);

                  if (moreLooks.length === lookConfig.limit) {
                      //more pages possible
                      $scope.disableScrollCheck = false;
                  }
              }
          });
        };
	}
]);