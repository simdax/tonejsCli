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
