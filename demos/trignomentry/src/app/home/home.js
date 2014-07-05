/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope ) {
})
.directive('unitCircleTrignomentry',function(){
  return {
    restrict:'E',
    scope:{},
    replace:true,
    template:'<svg id="trignomentry"></svg>',
    controller:function($scope, $element, $attrs){

    },
    link:function($scope, $element, $attrs){

      var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 600 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

      var x = d3.scale.linear()
              .domain([-1,1])
              .range([0, width]),
          y = d3.scale.linear()
              .domain([-1,1])
              .range([height, 0]);

      var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('top').tickSize(5,1);
          yAxis = d3.svg.axis()
                  .scale(y)
                  .orient('left').tickSize(1,1).tickFormat(function(d) { if(d){ return d; } });

      var svg = d3.select('svg#trignomentry')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);


      var gridScaleX = d3.scale.linear().domain([0,20]).range([0,width]),
          gridScaleY = d3.scale.linear().domain([0,20]).range([0,height]);

      var grid = d3.range(20).map(function(index,value){
          return {x:(index*10),y:0,width:(width/20),height:(height/20)};
      });

      var gridMesh =  d3.range(20).map(function(value,index){
          return grid;
      });

      var layer = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".layer")
          .data(gridMesh)
        .enter().append("g")
          .attr("transform",function(d,i){ return "translate(" + 0 + "," + gridScaleY(i) + ")"; })
          .attr("class", "layer");

      var rect = layer.selectAll("rect")
          .data(function(d) { return d; })
        .enter().append("rect")
          .attr("x", function(d,i) { return gridScaleX(i); })
          .attr("y", function(d) { return d.y; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; });

      var arc = d3.svg.arc()
            .startAngle(0)
            .endAngle(360)
            .innerRadius((width/2)-2)
            .outerRadius(width/2);

      svg.append("g").attr('class','arccircle').attr("transform", "translate(" + (margin.left+x(0)) + "," + (margin.top+y(0)) + ")")
        .append('path')
        .attr('d',arc)
        .attr('fill','#000');

      var cx = (margin.left+x(0)),
          cy = (margin.top+y(0)),
          px = (margin.left+x(1)),
          py = (margin.top+y(0));

      var drag = d3.behavior.drag()
          .on("drag", function(d) {
            var mx = d3.mouse(this)[0];
            var my = d3.mouse(this)[1];
            
            //get angle
            var omega = Math.atan2(mx - cx, my - cy);
            var px = cx + (width/2) * Math.sin(omega);
            var py = cy + (height/2) * Math.cos(omega);

            d3.select("circle")
              .attr({
                cx: px,
                cy: py
              });

            triangle([{x:cx,y:cy},{x:px,y:py},{x:px,y:cx},{x:cx,y:cy}]);
          });


      svg.append('circle').call(drag)
          .attr({'cx':(margin.left+x(1)),'cy':(margin.top+y(0)),'r':'8px'});

      var lx = d3.scale.linear().range([0, (width/2)]),
          ly = d3.scale.linear().range([(height/2), 0]);

      var line = d3.svg.line()
              .x(function(d) { return (d.x); })
              .y(function(d) { return (d.y); });

      var triangle = function(data){
        if(data)
        {
          if(svg.select('.righttriangle'))
          {
            svg.select('.righttriangle').remove();
          }
          svg.append("g").attr('class','righttriangle')
              .append('path')
              .attr('d',line(data));
        }
      };

      triangle([{x:cx,y:cy},{x:px,y:py}]);

      svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + (margin.top+y(0)) + ")")
      .call(xAxis);

      svg.append("g")
      .attr("transform", "translate(" + (margin.left+x(0)) + "," + margin.top + ")")
      .call(yAxis);

    }
  };
});

