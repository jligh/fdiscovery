'use strict';

angular.module('lookbook').directive('lookItem', [
	function() {
		return {
			templateUrl: 'modules/lookbook/views/look-item.client.directive.view.html',
			restrict: 'E',
            replace: true,
            scope: {
              look: '='
            },
			link: function postLink(scope, element, attrs) {
				// this is a simple directive, but can extend to do more complex things in the future
			}
		};
	}
]);