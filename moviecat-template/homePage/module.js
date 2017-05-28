/**
 * 
 * @authors Jokal (you@example.org)
 * @date    2017-05-27 14:10:24
 * @version $Id$
 */
(function(angular){

	var app=angular.module('homePage',[]);
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home_page',{
			templateUrl:'../homePage/home.html',
			controller:'homePageCtrl'
		}).otherwise({ 
			redirectTo:'/home_page' 
		})
	}]);

	app.controller('homePageCtrl', ['$scope', function ($scope) {
		console.log('主页加载了---')
	}])

})(angular)
