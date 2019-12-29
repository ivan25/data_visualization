function plot_ternary(chart_id, data, height) {
	var	width = height * 2 * 0.577;
	var margin = {bottom: 75, top: 75, left: 75, right: 75};
	
	var chart = d3.select(chart_id)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', function() {
			return 'translate('+margin.left+','+margin.bottom+')';
		});
		
	chart.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('fill', '#eee');
		
	var x_conv = d3.scaleLinear().range([0, width]).domain([0, 2*0.577]);
	var y_conv = d3.scaleLinear().range([height, 0]).domain([0, 1]);
	
	var r_conv = d3.scaleSqrt()
		.domain(d3.extent(data, function(d) { return +d[3]; }))
	//	.domain([10000, 100000, 500000])
	//	.range([1, 5, 10, 20]);
		.range([1, 20]);
		
	var line = d3.line()
    	.x(function(d) { return x_conv(0.577*(2 - 2*d[0] - d[1])); })
    	.y(function(d) { return y_conv(d[1]); });
    	
    chart.append('path')
		.datum([[1,0], [0,1], [0,0], [1,0]])
		.attr('d', line)
		.attr('class', 'line')

	var coord_aree = [[[1, 0], [0.5, 0.5], [0.334, 0.334], [0.5, 0], [1, 0]],
						[[0, 1], [0.5, 0.5], [0.334, 0.334], [0, 0.5], [0, 1]],
						[[0, 0], [0.5, 0], [0.334, 0.334], [0, 0.5], [0, 0]]];
	var fill_aree = ['#F44336', '#3F51B5', '#FFEB3B'];
	
	coord_aree.forEach(function(d, i) {
		chart.append('path')
			.datum(d)	
			.attr('d', line)
			.attr('class', 'area')
			.attr('fill', fill_aree[i]);
	});

    chart.selectAll('circle.point')
		.data(data).enter()
		.append('circle')
	  	.attr('cx', function(d) { return x_conv(0.577*(2 - 2*d[0] - d[1])); })
	  	.attr('cy', function(d) { return y_conv(d[1]); })
	  	.attr('r', function(d) {
	  		return r_conv(+d[3]);
	  	})
	  	.attr('class', function(d) {
	  		return 'point ';// + d[4].split('_')[1];
	  	})
	  	.append("svg:title")
	  	.text(function(d) {
	  		return d[4];
	  	});
	  
	// griglia
	var vgrid = [];
	
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < vgrid.length; j++) {
			if (i == 0) { var grid_ij = [[vgrid[j], 0, 1-vgrid[j]], [vgrid[j], 1-vgrid[j], 0]]; }
			if (i == 1) { var grid_ij = [[0, vgrid[j], 1-vgrid[j]], [1-vgrid[j], vgrid[j], 0]]; }
			if (i == 2) { var grid_ij = [[0, 1-vgrid[j], vgrid[j]], [1-vgrid[j], 0, vgrid[j]]]; }
		
			chart.append('path')
				.datum(grid_ij)
				.attr('d', line)
				.attr('class', 'gridline');
		}
	}
}
