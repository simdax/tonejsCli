import {random} from 'lodash'

let generate = function (nb, min = 0, max = 5) {
	var res = []
	for (var i = 0; i < nb; i++) {
		res.push(random(0, 5, false))
	}
	return res
}

export default function (nb) {
	var mel = generate(nb)
	return mel
}
