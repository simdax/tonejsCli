export function	findPath (all) {
				all = all.map(v => { return v.replace(/\s/g, '') })
				var path = all[0][0]
				for (var i = 1; i < all[0].length; i++) {
					var distances = []
					for (var j = 0; j < all.length; j++) {
						distances.push(parseInt(all[j][i]) - parseInt(path[i - 1]))
					}
					for (var k = 1; k < distances.length; k++) {
						var l = k - 1
						console.log(distances)
						while (distances[j] && distances[k] < distances[l]) {
							// swap
							var tmp = distances[l]; distances[l] = distances[k]; distances[k] = tmp
							l--
						}
						console.log(distances)
					}
					path += distances[0]
				}
				return path
			}

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

