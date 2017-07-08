
export function format (note) {
				return (Math.sign(note) === -1 ? (note + 7) : note) % 7
			}

export function formatString (string) {
				var array = string.split('')
				var res = array.map(v => { return format(parseInt(v)) })
				res = res.join().replace(/,/g, '')
				return res
			}

export 	function rotate (array, n) {
				var dep = array.split('').map(v => { return parseInt(v) })
				var res = []
				for (var i = 0; i < dep.length; i++) {
					res.push(dep[(i + n) % dep.length])
				}
				return res
			}

export function add (grille, n) {
	var res = grille.split('').map(v => { return parseInt(v) + n })
	res = res.map(v => { return format(v) })
	return res.join().replace(/,/g, '')
}

export function rythme (grille, rythmes) {
				var res = ''
				for (var i = 0; i < grille.length; i++) {
					var rythme = rythmes[i % rythmes.length]
					for (var j = 0; j < parseInt(rythme); j++) {
						res += grille[i]
					}
				}
				return res
			}

export function until (grille, dur) {
				var res = ''
				for (var i = 0; i < dur; i++) {
				  res += grille[i % grille.length]
				}
				return res
			}

export function inverse (grille, bool) {
				if (bool) {
					var res = ''
					for (var i = grille.length - 1; i >= 0; i--) {
						res += grille[i]
					}
					return res
				} else {
					return grille
				}
			}

export function reverse (grille, bool) {
				if (bool) {
					var intervalles = [parseInt(grille[0])]
					for (var i = 1; i < grille.length; i++) {
						var lettre = parseInt(grille[i])
						var lettreAvant = parseInt(grille[i - 1])
						intervalles.push(lettre - lettreAvant)
					}
					var res = intervalles.reduce((a, b) => {
						var note = 0
						if (!Array.isArray(a)) {
							note = a - b
							if (note < 0) { note += 7 }
						  return [a].concat(note)
						}	else {
							note = a[a.length - 1] - b
							if (note < 0) { note += 7 }
							return a.concat(note)
						}
					})
					if (res.length > 0) {
						return res.join().replace(/,/g, '')
					}
				} else {
					return grille
				}
			}
