import json

def parse_line(line):
	# esempio:
	# Aiello Francesco (MPA Micciche, 2080 RG) - Cento Passi Fava

	res = {}
	line = [elem.strip() for elem in line.split('-')]

	res['from'] = line[0].split('(')[1].split(',')[0].upper()
	res['to'] = line[1].strip().upper()

	res['cand_from'] = res['from'].split(' ')[-1].strip()
	res['cand_to'] = res['to'].split(' ')[-1].strip()

	res['voti'] = int(line[0].split('(')[1].split(',')[1].strip().split(' ')[0])

	if res['from'] == 'CANTIERE POPOLARE MUSUMECI':
		res['from'] = 'CANT.POP. MUSUMECI'

	if res['to'] == 'DIVENTER\xc3\xa0 BELLISSIMA MUSUMECI':
		res['to'] = 'DIV.BELL. MUSUMECI'

	if res['to'] == 'POPOLARI AUTONOMISTI MUSUMECI':
		res['to'] = 'POP.AUT. MUSUMECI'

	return res

# ------------------------------------------------------------------------------

path_file = '~/Scrivania/reg17/flusso.txt'

with open(path_file, 'r') as f:
	text_flusso = f.read()

table_flusso = text_flusso.split('\n')
table_flusso = [line for line in table_flusso if line != '']
table_flusso = [parse_line(line) for line in table_flusso]

list_from = list(set([p['from'] for p in table_flusso]))
list_to = list(set([p['to'] for p in table_flusso]))

list_cand_from = list(set([p['cand_from'] for p in table_flusso]))
list_cand_to = list(set([p['cand_to'] for p in table_flusso]))

print list_from
print list_to

print list_cand_from
print list_cand_to

res_partiti = {}
res_candidati = {}

for from_i in list_from:
	tot_voti_i = 0

	for to_j in list_to:
		voti_ij = sum([p['voti'] for p in table_flusso if p['from'] == from_i and p['to'] == to_j])
		tot_voti_i += voti_ij

		if from_i not in res_partiti.keys():
			res_partiti[from_i] = {}

		res_partiti[from_i][to_j] = voti_ij

	res_partiti[from_i]['TOTALE'] = tot_voti_i

for from_i in list_cand_from:
	tot_voti_i = 0

	for to_j in list_cand_to:
		voti_ij = sum([p['voti'] for p in table_flusso if p['cand_from'] == from_i and p['cand_to'] == to_j])
		tot_voti_i += voti_ij

		if from_i not in res_candidati.keys():
			res_candidati[from_i] = {}

		res_candidati[from_i][to_j] = voti_ij

	res_candidati[from_i]['TOTALE'] = tot_voti_i

with open('~/Scrivania/flussi_partiti.json', 'w') as f:
	json.dump(res_partiti, f, indent=2)

with open('~/Scrivania/flussi_candidati.json', 'w') as f:
	json.dump(res_candidati, f, indent=2)
