'use strict';

angular.module('lookbook').controller('LookbookController', ['$scope', '$stateParams', 'theLooks', 'looks', 'lookConfig', '$window',
	function($scope, $stateParams, theLooks, looks, lookConfig, $window) {

        $window.scrollTo(0, 0);
        console.log('hey');
        console.log(theLooks);
        $scope.looks = theLooks;

        $scope.disableScrollCheck = false;
        var page = 1;
        $scope.loadNext = function() {
          if ($scope.disableScrollCheck) {
              return;
          }
          console.log('next!');
          $scope.disableScrollCheck = true;
          var lastId = $scope.looks[$scope.looks.length - 1]._id;
          looks.getRandomLooks(page + 1, lookConfig.limit, $stateParams.type).then(function(moreLooks) {
              if (moreLooks.length) {
                  $scope.disableScrollCheck = false;
                  page++;
                  console.log('more found!');
                  console.log(moreLooks);
                  $scope.looks = $scope.looks.concat(moreLooks);
                  console.log($scope.looks.length);
              } else {
                  console.log('reached the end!');
                  $scope.disableScrollCheck = true;
              }
          });
        };
	}
]);