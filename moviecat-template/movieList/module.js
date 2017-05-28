/**
 * 
 */
(function(angular) {
    var app = angular.module('moveList', ['ngRoute']);
    app.config(['$routeProvider', function($routeProvider) {
        //最初定义
        // $routeProvider.when('/in_theaters',{
        // 	templateUrl:'../movieList/movieList.html',
        // 	controller:'movieCtrl',
        // })
        
        // 动态路由参数
        $routeProvider.when('/:category/:page?', { //代表的是当前的页码
            templateUrl: '../movieList/movieList.html',
            controller: 'movieCtrl',
        })
    }]);

    app.controller('movieCtrl', ['$scope', '$routeParams', '$http', 'myService', '$route',
        function($scope, $routeParams, $http, myService, $route) {
            console.log('分页加载了...');
            console.log($routeParams);
            //这是从本地获取数据
            // $http.get('../movieList/data.json').success(function(data){
            // 	console.log(data);
            // 	$scope.list=data;
            // })
            
            
            //通过跨越jsonp方式获取异步加载
            //豆瓣电影正在热映电影url='http://api.douban.com/v2/movie/in_theaters'
            // myService.jsonP('http://api.douban.com/v2/movie/' + $routeParams.category, {
            //     start: 0,
            //     count: 20
            // }, function(data) {
            //     console.log(data);
            //     $scope.list = data;
            //     $scope.$apply();   //jsonp是原生封装的, 会阻止进行脏检查, 必须手动触发数据脏检查
            // });
            
            var page = $routeParams.page; //获取page的值
            page = (page - 0) || 1;  //给page设置一个初始值
            console.log(page);
            $scope.page = page;  //赋值给作用域

            $scope.count = 20;  //每一页显示的电影数目

            // page  start(起始值)   count=10
            //  1      0       
            //  2 	   10
            //  3      20
            $scope.isLoading = true;//发送jonsp之前显示loading
            myService.jsonP('http://api.douban.com/v2/movie/' + $routeParams.category, {
                start: (page-1)*$scope.count,
                count: $scope.count,
                q: $routeParams.q,
            }, function(data) {
                console.log(data);
                $scope.list = data;
                
                // 电影的总数
                $scope.totalAll = data.total; 

                //页数的总数=总数/一页显示的数
                $scope.totalPage = Math.ceil( data.total / $scope.count ); 


                $scope.isLoading = false;//发送jsonp完了之后将loading隐藏
                
                //jsonp是原生封装的, 会阻止数据进行脏检查, 必须手动触发数据脏检查
                $scope.$apply();   
            });
            
            //点击上下翻页按钮
            $scope.newPage=function(newPage){
            	//判断一下 如果page<1 或者page大于总页数不能再点击
            	if(newPage<1 || newPage>$scope.totalPage){
            		return false;
            	}
            	
            	$scope.page=newPage;

            	//路由提供了一个更改$routeParams参数的方法 updateParams({})
            	$route.updateParams({
                    page: newPage // 直接将page改变成newPage，同时导致路由变化
                })
            }
    }])
})(angular)