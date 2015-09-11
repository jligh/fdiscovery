'use strict';

(function() {
	// Lookbook Controller Spec
	describe('Lookbook Controller Tests', function() {
		// Initialize global variables
		var LookbookController,
            looks,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, $q) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
            var theLooks = [
                {
                    title: 'test',
                    blurb: 'description',
                    details_url: 'http://www.google.com',
                    image_url: 'http://www.yahoo.com',
                    author: {
                        displayName: 'Barry Bonds',
                        img: 'http://www.yahoo.com'
                    }
                }
            ];

            looks = {
                getRandomLooks: jasmine.createSpy().and.returnValue($q.when([{title: 'test2'}]))
            };

			// Initialize the Lookbook controller.
			LookbookController = $controller('LookbookController', {
				$scope: scope,
                theLooks: theLooks,
                looks: looks
			});
		}));

        it('Should initialize the scope values', inject(function() {
            expect(scope.looks.length).toBe(1);
            expect(scope.disableScrollCheck).toBe(false);
        }));

		it('Should load the next set', inject(function() {
			scope.loadNext();
            scope.$digest();
            expect(looks.getRandomLooks).toHaveBeenCalled();
            expect(scope.looks.length).toBe(2);
            expect(scope.looks[1].title).toBe('test2');
		}));
	});
}());