<template>	
	<div>
		<div id="table">
			<table>
				<thead>
					<tr>
						<th> grille d'accord \ mel </th>
						<td v-for="n in mel"> {{ n }} </td>
						<td> result </td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(grille,indexGrille) in grilles'>
						<!-- we have to low down -->
						<th>{{ grille }}</th>
						<td v-for='(note,indexNote) in mel' 
						:style='{ color : isVector(grille, indexGrille, note, indexNote) ? "blue" : "red" }'>
						{{ distance(grille, note, indexNote) }}
					</td>
					<td>{{ Math.round(results[indexGrille] / 2) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- <input type="number" v-model.number='nb'> -->
	<input type="telefon" v-model='grille'>
	<input type="telefon" v-model='mel'>
</div>
</template>

<style>
	table{
		table-layout: fixed;
	}
	td{
		text-align: center;
		width: 6%
	}
</style>

<script>

	export default {
		data () {
			return {
				nb: 12,
				mel: '0123456',
				grille: '0514',
				results: []
			}
		},
		watch: {
			mel () { this.results = [] },
			grille () { this.results = [] }
		},
		computed: {
			grilles () {
				var res = []
				for (var i = 0; i < this.grille.length; i++) {
					res.push(this.move(i))
				}
				return res
			}
		},
		methods: {
			move (n) {
				var dep = this.grille.split('').map(v => { return parseInt(v) })
				var res = []
				for (var i = 0; i < dep.length; i++) {
					res.push(dep[(i + n) % dep.length])
				}
				return res
			},
			getResults () {
				// clear results
				this.results.splice(0)
				for (var i = 0; i < this.grille.length; i++) {
					var tds = document.querySelectorAll('tbody tr:nth-child(' + (i + 1) + ') td')
					var res = 0
					for (var j = 0; j < tds.length; j++) {
						if (tds[j].style.color === 'blue') {
							res++
						}
					}
					this.results.push(res)
				}
			},
			distance (grille, note, indexNote) {
				// distance entre basse et melodie
				var	dist = (note % 7) - grille[indexNote % this.grille.length]
				// convertie en intervalle 0 <-> 6
				return Math.sign(dist) === -1 ? (dist + 7) : dist
			},
			isVector (grille, indexGrille, note, indexNote) {
				var n = this.distance(grille, note, indexNote)
				var res = (n === 0 || n === 2 || n === 4)
				if (!this.results[indexGrille]) { this.results.push(0) }
				this.results[indexGrille] += (res ? 1 : 0)
				return res
			}
		}
	}
</script>
