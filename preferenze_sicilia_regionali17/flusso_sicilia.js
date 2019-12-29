function draw_matrix(data) {

	var height = 500;
	var width = 1200;
	var margin = {'top': 25, 'bottom': 25, 'left': 25, 'right': 25};
	
	var extent_candidati = [0, 5000, 175000];
	var extent_partiti = [0, 50000];
	var extent_perc = [0, 1];
	
	var colors_partiti = ['#BBDEFB', '#F44336'];
	var colors_perc = ['#BBDEFB', '#F44336'];
	var colors_candidati = ['#F5F5F5', '#BBDEFB', '#F44336'];
	
	var list_from_partiti = ['label', 'PDL MUSUMECI', 'FLI MICCICHE', 'CANT.POP. MUSUMECI', 
							'LISTA MUSUMECI', 'FLI MUSUMECI', 'MPA MICCICHE', 'GRANDE SUD MICCICHE', 
								'MEGAFONO CROCETTA', 'UDC CROCETTA', 'PD CROCETTA', 
								'FDS/SEL/VERDI MARANO', 'IDV MARANO', 
								'M5S CANCELLERI'];
	var list_to_partiti = ['label', 'FI MUSUMECI', 'FDI/NCS MUSUMECI', 'POP.AUT. MUSUMECI', 
							'DIV.BELL. MUSUMECI', 'UDC MUSUMECI',
								'LISTA MICARI', 'SICILIA FUTURA/PSI MICARI', 'PD MICARI', 'AP MICARI',
								 'CENTO PASSI FAVA', 
								 'M5S CANCELLERI'];
	
	var list_from_candidati = ['label', 'CROCETTA', 'MARANO', 'MICCICHE', 
								'MUSUMECI', 'CANCELLERI'];
	var list_to_candidati = ['label', 'MICARI', 'FAVA', 'MUSUMECI', 'CANCELLERI'];
	
	// seleziona il tipo di dati
	var list_from = list_from_partiti;
	var list_to = list_to_partiti;
	var extent = extent_partiti;
	var colors = colors_partiti;
	
/*	var list_from = list_from_partiti;
	var list_to = list_to_partiti;
	var extent = extent_perc;
	var colors = colors_perc;*/
/*	
	var list_from = list_from_candidati;
	var list_to = list_to_candidati;
	var extent = extent_candidati;
	var colors = colors_candidati;*/
	
	// -------------------------------------------------------
	
	var x_conv = d3.scaleBand()
		.domain(list_to)
		.range([0, width])
		.padding(0.025);
		
	var y_conv = d3.scaleBand()
		.domain(list_from)
		.range([0, height])
		.padding(0.05);
		
	var color_conv = d3.scaleLinear()
		.domain(extent)
		.range(colors);

	chart = d3.select('#chart0')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', function() {
			return 'translate(' + margin.left + ',' + margin.top + ')';
		});

	for (var i=0; i < list_from.length; i++) {
		from_i = list_from[i];
		
		chart.selectAll('rect.cell')
			.data(list_to).enter()
			.append('rect')
			.attr('x', function(to_j) {
				return x_conv(to_j);
			})
			.attr('y', function() {
				return y_conv(from_i);
			})
			.attr('height', function() { return y_conv.bandwidth(); })
			.attr('width', function() { return x_conv.bandwidth(); })
			.attr('fill', function(to_j) {
				if (from_i == 'label' || to_j == 'label') {
					return '#F5F5F5';
				}
				
				return color_conv(data[from_i][to_j]);
			//	return color_conv(data[from_i][to_j]/data[from_i]['TOTALE']);
			})
			.attr('class', function(to_j) {
				if (from_i == 'label' || to_j == 'label') {
					return 'label_cell';
				}
				
				return 'data_cell';
			});
			
		chart.selectAll()
			.data(list_to).enter()
			.append('text')
			.attr('x', function(to_j) {
				return x_conv(to_j) + 0.5 * x_conv.bandwidth();
			})
			.attr('y', function() {
				return y_conv(from_i) + 0.5 * y_conv.bandwidth();
			})
			.attr('text-anchor', 'middle')
			.text(function(to_j) {
				if (from_i == 'label') {
					if (to_j != 'label') {
						return to_j.slice(0, 13);
					}
					
					return '';
				}
				
				if (from_i != 'label' && to_j == 'label') {
					return from_i.slice(0, 12);
				}
				
				if (data[from_i][to_j] == 0) {
					return '';
				}
				
			//	return Math.round(1000*data[from_i][to_j]/data[from_i]['TOTALE'])/10 + ' %';
				return data[from_i][to_j];
			})
			.attr('class', function(to_j) {
				if (from_i == 'label' || to_j == 'label') {
					return 'label_cell';
				}
				
				return 'data_cell';
			});
	}
	
	// inserisco contorno aree politiche
	var border_cdx = {'startx': 'FI MUSUMECI', 'lenx': 5, 'starty': 'PDL MUSUMECI', 'leny': 7};
	var border_csx = {'startx': 'LISTA MICARI', 'lenx': 4, 'starty': 'MEGAFONO CROCETTA', 'leny': 3};
	var border_sx = {'startx': 'CENTO PASSI FAVA', 'lenx': 1, 
								'starty': 'FDS/SEL/VERDI MARANO', 'leny': 2};
	var border_m5s = {'startx': 'M5S CANCELLERI', 'lenx': 1, 'starty': 'M5S CANCELLERI', 'leny': 1};
	
	var data_borders = [border_cdx, border_csx, border_sx, border_m5s];
	
	chart.selectAll('rect.border_area')
		.data(data_borders).enter()
		.append('rect')
		.attr('x', function(d) {
			return x_conv(d['startx']);
		})
		.attr('y', function(d) {
			return y_conv(d['starty']);
		})
		.attr('width', function(d) {
			return d['lenx'] * x_conv.bandwidth() + 
				x_conv.bandwidth() * x_conv.padding() * (d['lenx']-1);
		})
		.attr('height', function(d) {
			return d['leny'] * y_conv.bandwidth() +
				y_conv.bandwidth() * y_conv.padding() * (d['leny']-1);
		})
		.attr('fill', 'transparent')
		.attr('stroke', 'black')
		.attr('stroke-width', '2.5px');
}
