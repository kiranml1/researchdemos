'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
	$scope.urls = [
      {read:'flare.json'},
      {read:'flars.json'}
    ];
  $scope.url = $scope.urls[0];
	$scope.attrs = ['ROOT','TIME FRAME','GEO','FUNCTION', 'PRODUCT', 'MEDIA TYPE', 'VENDOR', 'PROGRAM', 'LEADS'];

}])
.directive('stackedBarView', [ '$interval', '$http', function($interval, $http){
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			attrs:'=',
			item:'='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div class="parent-stack">'+
									'<div class="progress">'+
									  '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">'+
									    '<span class="sr-only">40% Complete (success)</span>'+
									  '</div>'+
									'</div>'+
							'</div>',
		// templateUrl: '',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			angular.element(iElm).parent().css({'position':'relative', "margin":"10px", "padding":"10px", "float":"left" });

			var margin = {top: 20, right: 20, bottom: 40, left: 20},
			    width = parseInt(iAttrs.width) - margin.left - margin.right,
			    height = parseInt(iAttrs.height) - margin.top - margin.bottom;

			var w = width,
			    h = height,
			    x = d3.scale.linear().range([0, w]),
			    y = d3.scale.linear().range([0, h]),
			    gutter = 0.02;

			var container = d3.select(iElm[0]).append("div")
					  .attr("class", "stack-bar")
					  .style("width", parseInt(iAttrs.width) + "px")
					  .style("height", parseInt(iAttrs.height) + "px");

			var partition = d3.layout.partition()
								.children(function(d) { return isNaN(d.children) ? d.children : null; })
								.value(function(d) { return d.size; });

			var partitionHead = d3.layout.partition()
								.children(function(d) { return isNaN(d.children) ? d.children : null; })
								.value(function(d) { return d.size; });


			function update(partition,root) {

					var main = container.append("svg:svg")
					  .attr("width", w + margin.left + margin.right)
					  .attr("height", h + margin.top + margin.bottom);

					var	iWidth, iFlag = 2, flags = [], output = [];

					var vis = main.append('g')
								.attr('class','main');

					var head = main.append('g')
								.attr('class','head');

					var gEnter = vis.selectAll("g.blocks")
					      .data(partition);

					var gheadEnter = head.selectAll("g.head")
						      	.data(_.uniq(partition,false,function(values,index){
								      	return values.depth;
								      }));

					var g = gEnter.enter().append("svg:g")
					      .attr('class','blocks')
					      .attr("display", function(d) { return d.depth ? null : "none"; })
					      .attr("transform", function(d) { if(iFlag){ iWidth = x(d.y); iFlag--; } return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

					vis.attr("transform","translate(" + -iWidth + "," + 60 + ")");
					main.attr('width', main.attr('width') - iWidth );
					//d3.select(iElm[0]).style('width', main.attr('width') + "px" );
					d3.select('div.stack-bar').style('width', main.attr('width') + "px" );
					//angular.element(iElm).parent().css('width', main.attr('width') + "px" );

					var kx = w / root.dx,
					    ky = h / 1;

				  var ghead = gheadEnter.enter().append("svg:g")
										      .attr('class','head')
										      .attr("display", function(d) { return (d.depth) ? null : "none"; })
										      .attr("transform", function(d) { if(iFlag){ iWidth = x(d.y); iFlag--; } return "translate(" + x(d.y) + "," + 0 + ")"; });

					ghead.append("svg:rect")
					      .attr('class','head')
					      .attr("width", function(d){ return (root.dy * kx) - (gutter * root.dy * kx); })
					      .attr("height", function(d) { return 50; });

					ghead.append("svg:text")
								.attr('class','head')
								.attr("transform", function(d,i) {
									return "translate("+ ((d.dy * kx / 2) - (gutter * d.dy * kx)) +"," + 25 + ")";
								})
								.attr("dy", ".35em")
								.style("opacity", function(d) { return 0; })
					      .transition()
					      .duration(750)
								.style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
								.text(function(d,i) { return $scope.attrs[i]; });

					head.attr("transform","translate(" + -iWidth + "," + 0 + ")");

					g.append("svg:rect")
					      .attr("width", (root.dy * kx) - (gutter * root.dy * kx))
					      .attr("height", function(d) { return 0; })
					      .attr("class", function(d) { return d.children ? "parent" : "child"; })
					      .transition()
					      .duration(750)
					      .attr("height", function(d) { return ((d.dx * ky) - (gutter * root.dy * kx)); })

					g.append("svg:text")
					      .attr("transform", function(d) {
						    		return "translate("+ ((d.dy * kx / 2) - (gutter * d.dy * kx)) +"," + ((d.dx * ky / 2) - (gutter * d.dy * kx)) + ")";
								})
					      .attr("dy", ".35em")
					      .style("opacity", function(d) { return 0; })
					      .transition()
					      .duration(750)
					      .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
					      .text(function(d) { return d.name; });

					gheadEnter.exit().transition().duration(1000).remove();
					gEnter.exit().transition().duration(1000).remove();

			}

		  $scope.$watch('item.read',function(n,o){
		  		$http.get($scope.item.read).then(function(data,status) {
		  			if(d3.select(iElm[0]).select('svg')){
		  				d3.select(iElm[0]).select('svg').remove();
		  			}
		  			update(partition.nodes(data.data), data.data);
		  		},function(){
		  			console.log('Error is Request');	
		  		},function(data){
		  			console.log(data);
		  		});
		  },true);

		}
	};
}]);