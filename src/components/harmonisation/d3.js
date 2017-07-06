export function	updateD3 (d3, color) {
			d3.attr('cx', (d, i) => { return 10 + i * 20 })
				.attr('cy', (d) => {
					if (d === ' ') {
						return 1500
					} else {
						return 100 - parseInt(d) * 10
					}
				})
				.attr('fill', color)
		}
