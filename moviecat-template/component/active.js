/**
 * 
 */
(function(angular){
	var app=angular.module('autoActive',[]);
	

	//自定义指令
	app.directive('autoActive', ['$location', function ($location) {
		return {
			restrict: 'ACE',   //限制指令的功能
			link: function (scope, element, attrs) {
				// console.log(scope);
				scope.location=$location;
				scope.$watch('location.url()', function(newValue){
					console.log('---监听',newValue);

					//获取href属性
					var href=element.children().attr('href');

					if(href.indexOf(newValue)>-1){
						//添加样式
                        element.parent().children().removeClass(attrs.autoActive); //移除兄弟和自己的样式
                        element.addClass(attrs.autoActive); //给自己添加样式
					}
				})
			}
		};
	}])
	

})(angular)