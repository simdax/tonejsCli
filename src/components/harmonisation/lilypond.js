function pitch2Note (pitch) {
	var note = ''
	note = 'cdefgab'[pitch]
	return note
}

function notation (mel, rythme, resolution) {
	var note = pitch2Note(parseInt(mel))
	// okay okay .......
	// rythme = parseInt(rythme) / resolution
	// 8, 8., 4, 4 ~ 16 , 4. ,4 ~8.  ,2,2 ~ 16
	var rules = [`${note}16`, `${note}8`, `${note}8.`,
							`${note}4`, `${note}4~${note}16`, `${note}4.`, `${note}4..`,
							`${note}2`, `${note}2 ~ ${note}16`]
	var index = parseInt(rythme) - 1
	var res = rules[index]
	console.log(index, res)
	return res
}

export default function convert2ly (mel, rythme, resolution) {
	var res = ''
	for (var i = 0; i < mel.length; i++) {
		res += notation(mel[i], rythme[i % rythme.length], resolution) + ' '
	}
	return '{ ' + res + '}'
}
