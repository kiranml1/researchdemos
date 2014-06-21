define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularuicodemirror',
	'codemirror'
	], function (angular, filters, services, directives, controllers) {
		

		// Declare app level module which depends on filters, and services
		
		return angular.module('myApp', [
			'ngRoute',
			'ui.codemirror',
			'myApp.controllers',
			'myApp.filters',
			'myApp.services',
			'myApp.directives'
		]);
});
