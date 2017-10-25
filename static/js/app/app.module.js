var app = angular.module('app', ['ngRoute', 'myController']);

app.config(function($routeProvider){
	
	$routeProvider
	.when('/', {
		controller: 'homeCtrl',
		templateUrl: '/templates/dashbord.html'
	})
	$routeProvider
	.when('/accountsByUser', {
		controller: 'accountsByUserCtrl',
		templateUrl: '/templates/accountsByUser.html'
	})
	$routeProvider
	.when('/accountsByUseTemp', {
		controller: 'accountsByUseTempCtrl',
		templateUrl: '/templates/accountsByUseTemp.html'
	})
	$routeProvider
	.when('/SearchByNuID', {
		controller: 'SearchByNuIDCtrl',
		templateUrl: '/templates/SearchByNuID.html'
	});
	
});