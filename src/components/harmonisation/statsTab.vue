<template>
			<table>
				<thead>
					<tr>
						<th> <slot></slot> </th>
						<td v-for="n in mel"> {{ n }} </td>
						<td class='result'> result </td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(grille,indexGrille) in grilles'>
						<!-- we have to low down -->
						<th>{{ grille }}</th>
						<td v-for='(note,indexNote) in mel' 
						:style='{ color : vectors[indexGrille][indexNote] ? "blue" : "red" }'>
						{{ tabs[indexGrille][indexNote] }}
					</td>
					<td class="result">{{ results[indexGrille] }} % </td>
				</tr>
			</tbody>
		</table>
</template>

<style>
	table{
		table-layout: fixed;
	}
	td{
		text-align: center;
		font-size: 1.5em;
		width: 6%;
		background-color: #ddd
	}
	.result{
		font-weight: bold;
		font-size: 2em
	}
</style>

<script>

	export default {
		props: ['grille', 'mel'],
		created () {
			this.createTab()
		},
		computed: {
			grilles () {
				var res = []
				for (var i = 0; i < this.grille.length; i++) {
					res.push(this.move(i))
				}
				return res
			},
			vectors () {
				var res = []
				for (var i = 0; i < this.tabs.length; i++) {
					res.push([])
					for (var j = 0; j < this.tabs[i].length; j++) {
						res[i].push(this.isVector(i, j))
					}
				}
				return res
			},
			tabs () {
				var res = []
				for (var i = 0; i < this.grilles.length; i++) {
					res.push([])
					for (var j = 0; j < this.mel.length; j++) {
						var note = parseInt(this.mel[j])
						var distance = (note % 7) - this.grilles[i][j % this.grille.length]
						res[i].push(this.format(distance))
					}
				}
				return res
			},
			results () {
				var res = []
				for (var i = 0; i < this.vectors.length; i++) {
					res.push(0)
					for (var j = 0; j < this.vectors[i].length; j++) {
						res[i] += this.vectors[i][j] ? 1 : 0
					}
					res[i] = Math.round(res[i] / this.mel.length * 100)
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
			format (note) {
				return (Math.sign(note) === -1 ? (note + 7) : note) % 7
			},
			isVector (indexGrille, indexNote) {
				var n = this.tabs[indexGrille][indexNote]
				var res = (n === 0 || n === 2 || n === 4)
				return res
			}
		}
	}
</script>
