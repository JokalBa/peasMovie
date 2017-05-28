/**
 * 
 */
(function(angular) {
    var app = angular.module('movieDetail', ['ngRoute']);

   	//动态创建路由参数
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movie/details/:id', {
            templateUrl: '../move_detail/movie-detail.html',
            controller: 'movieDetailCtrl'
        });
    }]);
    //豆瓣电影电影详情页/v2/movie/subject/:id
    app.controller('movieDetailCtrl', ['$scope', '$routeParams', 'myService',
        function($scope, $routeParams, myService) {
            //通过跨域获得数据
            myService.jsonP('http://api.douban.com/v2/movie/subject/' + $routeParams.id, {}, 
            	function(data) {
            		console.log('--电影详情:', data);
            		$scope.items = data;
            		$scope.$apply(); //jsonp是原生封装的,必须手动添加脏检查
            	})
        }
    ])
})(angular)