define(['angular', 'app'], function(angular, app) {
	
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/intro', {
			templateUrl: 'app/partials/partial1.html',
			controller: 'MyCtrl1'
		});
		$routeProvider.when('/practises', {
			templateUrl: 'app/partials/partial2.html',
			controller: 'MyCtrl2'
		});
		$routeProvider.when('/scopes', {
			templateUrl: 'app/partials/partial3.html',
			controller: 'MyCtrl3'
		});
		$routeProvider.when('/modules', {
			templateUrl: 'app/partials/partial4.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/comm', {
			templateUrl: 'app/partials/partial5.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/controllers', {
			templateUrl: 'app/partials/partial6.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/services', {
			templateUrl: 'app/partials/partial7.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/css', {
			templateUrl: 'app/partials/partial8.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/filters', {
			templateUrl: 'app/partials/partial9.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.when('/di', {
			templateUrl: 'app/partials/partial0.html',
			controller: 'MyCtrl4'
		});
		$routeProvider.otherwise({redirectTo: '/practises'});
	}]);

});