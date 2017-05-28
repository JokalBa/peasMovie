(function(angular) {
    "use strict";
    // start your ride
    // 
    var app = angular.module('moviecat', 
    	['ngRoute', 'homePage', 'moveList', 'moviecat.service', 'movieDetail','autoActive']);

    //创建控制模块
    app.controller('mainController', ['$scope', '$location', 
    	function($scope, $location) {
        //豆瓣电影搜索电影api接口	/v2/movie/search?q={text}
        // console.log($scope);
        $scope.search = function() {
            console.log('正在搜索...', $scope.query);

            //当搜索栏中为空时
            if(!$scope.query){
            	return false;
            }
            //angular提供的路由url自动刷新
            console.log($location.url());
            $location.url('/search?q=' + $scope.query);
        }
    }]);
})(angular);