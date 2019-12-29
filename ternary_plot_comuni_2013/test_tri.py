import json

def get_value(dict_in, key):
	if key in dict_in.keys():
		return dict_in[key]

	print 'err %s' % key
	return 0

with open('~/Scrivania/politica_it/elezioni/data_json/13_camera.json', 'r') as f:
	dict_13 = json.load(f)
	dict_13 = dict_13['DATA']

res = ['comune,tot_voti,perc_csx,perc_cdx,perc_m5s']

for com_i in dict_13.keys():
	voti_csx = get_value(dict_13[com_i], 'c24') * 1.0
	voti_cdx = get_value(dict_13[com_i], 'c31') * 1.0
	voti_m5s = get_value(dict_13[com_i], 'm5s') * 1.0

	voti_tot = voti_csx + voti_cdx + voti_m5s

	new_line = '%s,%s,%s,%s,%s' % (com_i, voti_tot,
										round(voti_csx/voti_tot, 3),
										round(voti_cdx/voti_tot, 3),
										round(voti_m5s/voti_tot, 3))
	res.append(new_line)

with open('~/Scrivania/res_ternary.csv', 'w') as f:
	f.write('\n'.join(res))
