
var province = ["SICILIA", "AG", "CL", "CT", "EN", "ME", "PA", "RG", "SR", "TP"];
var SEGGI_PROV = {'AG': 6, 'PA': 16, 'CT': 13, 'CL': 3, 'TP': 5, 'EN': 2, 
					'ME': 8, 'RG': 4, 'SR': 5};
					
var liste12_voti_abs = {'Fli': [83891, 10519, 3136, 22817, 2911, 13684, 15926, 996, 7181, 6721], 
	'Ppa': [959, 210, 46, 0, 34, 201, 229, 91, 78, 70], 
	'M5S': [285202, 20394, 19442, 58916, 10093, 25745, 70038, 24231, 23887, 32456], 
	'Mpa': [182737, 16209, 9310, 61048, 6183, 23980, 32548, 5712, 12402, 15345], 
	'LCroc': [118346, 12585, 9263, 20412, 7724, 10518, 18018, 15050, 13043, 11733], 
	'Adc': [5017, 487, 295, 0, 444, 1244, 1553, 0, 315, 679], 
	'Udc': [207827, 21432, 9906, 58008, 4226, 28217, 47085, 7967, 16122, 14864], 
	'Pdl': [247351, 24930, 5911, 74466, 7963, 31931, 59114, 12475, 13970, 16591], 
	'Idv': [67738, 2941, 2196, 9711, 1965, 12435, 24569, 3278, 7334, 3309], 
	'UDem': [100, 0, 0, 0, 0, 0, 0, 0, 100, 0], 
	'Pd': [257274, 19024, 15399, 45622, 10898, 51044, 59492, 15846, 19603, 20346], 
	'CantP': [112169, 15240, 7956, 17965, 2572, 9021, 33928, 6600, 12354, 6533], 
	'GrSud': [115444, 13106, 5481, 10043, 8680, 24148, 33494, 1840, 10034, 8618], 
	'LMus': [107397, 9048, 4675, 29315, 2230, 12026, 25927, 3423, 7369, 13384], 
	'SelFds': [58753, 5952, 1712, 13119, 1746, 8735, 15493, 3976, 3697, 4323]};

var liste12_voti = {"LCroc": [6.177, 7.155, 9.279, 4.726, 11.044, 3.924, 4.009, 13.882, 8.498, 7.385],
	"Udc": [10.848, 12.184, 9.923, 13.431, 6.043, 10.526, 10.476, 7.348, 10.504, 9.356],
	"Pd": [13.429, 10.815, 15.426, 10.564, 15.583, 19.042, 13.237, 14.616, 12.772, 12.807], 
	"UDem": [0.005, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.065, 0.0],
	"Idv": [3.536, 1.672, 2.2, 2.249, 2.81, 4.639, 5.467, 3.024, 4.778, 2.083], 
	"SelFds": [3.067, 3.384, 1.715, 3.038, 2.497, 3.259, 3.447, 3.667, 2.409, 2.721],
	"Pdl": [12.911, 14.173, 5.921, 17.242, 11.386, 11.912, 13.153, 11.506, 9.102, 10.443], 
	"Adc": [0.262, 0.277, 0.296, 0.0, 0.635, 0.464, 0.346, 0.0, 0.205, 0.427], 
	"LMus": [5.606, 5.144, 4.683, 6.788, 3.189, 4.486, 5.769, 3.157, 4.801, 8.424], 
	"CantP": [5.855, 8.664, 7.97, 4.16, 3.678, 3.365, 7.549, 6.088, 8.049, 4.112],
	"Fli": [4.379, 5.98, 3.141, 5.283, 4.162, 5.105, 3.543, 0.919, 4.679, 4.23], 
	"Ppa": [0.05, 0.119, 0.046, 0.0, 0.049, 0.075, 0.051, 0.084, 0.051, 0.044], 
	"GrSud": [6.026, 7.451, 5.491, 2.325, 12.411, 9.008, 7.452, 1.697, 6.537, 5.425], 
	"Mpa": [9.538, 9.215, 9.326, 14.135, 8.841, 8.946, 7.242, 5.269, 8.08, 9.659],
	"M5S": [14.887, 11.594, 19.476, 13.642, 14.432, 9.604, 15.583, 22.35, 15.563, 20.429]};
	
var liste_cand_12 = {"CROCETTA": ["LCroc", "Udc", "Pd", "UDem"], "MARANO": ["Idv", "SelFds"], 
	"MUSUMECI": ["Pdl", "Adc", "LMus", "CantP"], "MICCICHE": ["Fli", "Ppa", "GrSud", "Mpa"], 
	"CANCELLERI": ["M5S"]};
	
var COLOR_CAND12 = {'CROCETTA': '#C8E6C9', 'MARANO': '#FFCDD2', 
				'MUSUMECI': '#BBDEFB', 'MICCICHE': '#C5CAE9', 'CANCELLERI': '#FFF9C4'};

// -----------------------------------------------------------------------------

function crea_tabella(header_desc, header_input) {

	var list_colonne = [];
	list_colonne = list_colonne.concat(header_desc);
	list_colonne = list_colonne.concat(header_input);

	var table = d3.select('#table0');
	
	table.select('tr#risultati_seggi')
		.selectAll('td.seggisim')
		.data(header_input).enter()
		.append('td')
		.attr('class', 'seggisim')
		.text(0);
		
	table.select('tr#risultati_perc')
		.selectAll('td.percsim')
		.data(header_input).enter()
		.append('td')
		.attr('class', 'percsim')
		.text(0);
		
	table.append('tr').attr('class', 'header')
		.selectAll('td')
		.data(list_colonne).enter()
		.append('td')
		.text(function(d) { return d; });
		
	for (var cand12 in liste_cand_12) {
		for (var j = 0; j < liste_cand_12[cand12].length; j++) {
			lista12 = liste_cand_12[cand12][j];
		
			var voti12 = liste12_voti[lista12][0];
		
			var row_i = table.append('tr');
			
			row_i.selectAll('td.desc')
				.data([cand12, lista12, voti12]).enter()
				.append('td')
				.attr('class', 'desc')
				.text(function(d) { return d; })

			row_i.selectAll('td.input')
				.data(header_input).enter()
				.append('td')
				.attr('class', 'input')
				.append('input')
				.attr('type', 'number')
				.attr('min', 0)
				.attr('max', 100)
				.attr('id', function(d) {
					return 'input_' + lista12 + '_' + d;
				});
		}
	}
}

function crea_tabella_prov(table_id, dict_dati) {
	// crea una tabella con i voti provinciali del 2012

	var table = d3.select(table_id);
	
	var max_val = 0;
	for (var li12 in dict_dati) {
		max_val = d3.max([max_val].concat(dict_dati[li12].slice(1, dict_dati[li12].length)));
	}
	
	var color_conv = d3.scale.linear()
		.domain([0, max_val])
		.range(['#BBDEFB', '#F44336']);
	
	table.append('tr').attr('class', 'header')
		.selectAll('td')
		.data(['Candidato 12', 'Lista 12'].concat(province)).enter()
		.append('td')
		.text(function(d) { return d; });
		
	for (var cand12 in liste_cand_12) {
		for (var j = 0; j < liste_cand_12[cand12].length; j++) {
			lista12 = liste_cand_12[cand12][j];
			
			var row_i = table.append('tr');
			
			row_i.append('td')
				.attr('bgcolor', COLOR_CAND12[cand12])
				.text(cand12);
			
			row_i.append('td')
				.attr('bgcolor', COLOR_CAND12[cand12])
				.attr('class', 'border_td')
				.text(lista12);
		
			row_i.selectAll('td.provcell')
				.data(dict_dati[lista12]).enter()
				.append('td')
				.attr('class', 'provcell')
				.text(function(d) { return Math.round(d*100)/100; })
				.attr('bgcolor', function(d) {
					return color_conv(d);
				});
		}
	}
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

function calc_risultato() {
	// calcola il risultato dell'elezione, con i flussi immessi

	var risultati_prov_17 = {};
	var seggi_prov_17 = {};
	
	// calcolo la percentuale di voti una provincia alla volta
	for (var i = 0; i < province.length; i++) {
	
		var prov_i = province[i];
		
		// qui poi vengono salvati i risultati
		risultati_prov_17[prov_i] = {};
	
		// prendo ogni lista presente (nel 2017) e calcolo quanti voti ha, una alla volta
		for (var j = 0; j < liste17.length; j++) {
			var li17 = liste17[j];
		
			var perc_li17 = 0;
			
			for (var li12 in liste12_voti) {
				var flusso = 0.01 * document.getElementById('input_' + li12 + '_' + li17).value;
				perc_li17 += flusso * liste12_voti[li12][i];
			}
			
			// adesso abbiamo, per la provincia in questione, la perc di voti 
			//	della lista17 corrente
			risultati_prov_17[prov_i][li17] = perc_li17 * 0.01;
		}
	}
	
	// adesso calcolo i seggi una prov alla volta, escludendo le liste che in sicilia
	//	sono < 5%
	for (var i = 1; i < province.length; i++) {
		var prov_i = province[i];
		
		seggi_prov_17[prov_i] = calcolo_seggi(risultati_prov_17[prov_i], 
												SEGGI_PROV[prov_i],
												risultati_prov_17['SICILIA']);
	}
	
	// ---
	
	var seggi_totali = {};
	for (var i = 0; i < liste17.length; i++) {
		seggi_totali[liste17[i]] = 0;
	}
	
	// adesso calcolo i seggi totali, unendo le province
	for (var prov_i in SEGGI_PROV) {
		for (var li17 in seggi_prov_17[prov_i]) {
			seggi_totali[li17] += seggi_prov_17[prov_i][li17];
		}
	}
	
	// calcolo totali delle coalizioni
	var tot_coalizioni = {};
	var perc_coalizioni = {};
	
	for (var li17 in seggi_totali) {
		for (var cand in liste_cand_17) {
			if (liste_cand_17[cand].indexOf(li17) > -1) {

				if (cand in tot_coalizioni) {
					tot_coalizioni[cand] += seggi_totali[li17];
					perc_coalizioni[cand] += risultati_prov_17['SICILIA'][li17];
				}
				else {
					tot_coalizioni[cand] = seggi_totali[li17];
					perc_coalizioni[cand] = risultati_prov_17['SICILIA'][li17];
				}
			}
		}
	}
	
	// aggiornare la tabella con i risultati della sim
	var row_result = d3.select('#table0').select('#risultati_seggi')
		.selectAll('td.seggisim')
		.data(liste17)//.enter()
		.text(function(d) {
			return seggi_totali[d]; 
		});
		
	var row_result = d3.select('#table0').select('#risultati_perc')
		.selectAll('td.percsim')
		.data(liste17)//.enter()
		.text(function(d) {
			return Math.round(risultati_prov_17['SICILIA'][d]*1000)/10; 
		});
	
		
	for (var cand in tot_coalizioni) {
		if (tot_coalizioni[cand] >= 24) {
			var bg_color = '#B39DDB';
		} else {
			var bg_color = '#f6f6f6';
		}	
	
		d3.select('#table0').select('#risultati_coalizioni')
			.select('td#coal_'+cand)
			.attr('bgcolor', bg_color)
			.text(tot_coalizioni[cand] + ' (' + Math.round(perc_coalizioni[cand]*1000)/10 + '%)');
	}
}

// #############################################################################
// #############################################################################
// #############################################################################

function ordina_dict(dict_in) {
    var result = Object.keys(dict_in).sort(function(a, b) {
      return dict_in[b] - dict_in[a];
    })

    return result;
}

function calcolo_seggi(voti_partiti, Nseggi, perc_regionali) {
    // questa funzione calcola il numero dei seggi alla camera
    //  di ogni partito, data la sua percentuale di voti

	console.log(perc_regionali)

    var sbarramento = 0.05;

    var N = 1000;

    // quoziente di hare, numero di persone per seggio
	var Q = 1.0 * N / Nseggi

    var seggi_partiti = {};
    var resti_partiti = {};

    for (p in voti_partiti) {
		if (perc_regionali[p] < sbarramento) {
            continue;
        }

		var quoziente_partito = 1.0 * N * voti_partiti[p] / Q;
		seggi_partiti[p] = Math.floor(quoziente_partito);
		resti_partiti[p] = N * voti_partiti[p] - Q * seggi_partiti[p];
    }

    var N_seggi_assegnati = 0;
    for (p in seggi_partiti) {
        N_seggi_assegnati += seggi_partiti[p];
    }
	var N_seggi_rimanenti = Nseggi - N_seggi_assegnati;

    var N_partiti = Object.keys(seggi_partiti).length;

	// adesso assegno i seggi rimanenti con il metodo dei piu alti resti
	if (N_seggi_rimanenti > N_partiti) {
		// seggi che aggiungo a tutti i partiti, e' come se
        //  scorressi la lista piu volte
		var N_seggi_add = Math.floor(N_seggi_rimanenti / N_partiti);
		var N_seggi_rimanenti = N_seggi_rimanenti % N_partiti;

		for (p in seggi_partiti) {
			seggi_partiti[p] += N_seggi_add;
        }
	}

	partiti_sorted = ordina_dict(resti_partiti);

    // adesso assegno tutti i seggi rimanenti ai primi partiti della
    //  lista partiti_sorted cioe quelli che hanno i resti piu alti.
    // Se ad es avanzano due seggi assegno un seggio ciascuno ai
    //  primi due partiti di partiti_sorted
    for (var i = 0; i < N_seggi_rimanenti; i++) {
		seggi_partiti[partiti_sorted[i]] += 1;
    }
    
    // adesso metto i partiti che hanno 0 seggi, perche sotto sbarramento
    for (p in voti_partiti) {		
   		if (perc_regionali[p] < sbarramento) {
        	seggi_partiti[p] = 0;
        }
	}

	return seggi_partiti
}
