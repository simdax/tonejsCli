<template>
<div>
		<table>
			<thead>
				<tr>
					<th> <slot></slot> </th>
					<td v-for="n in formatString(mel)"> {{ n }} </td>
					<td class='result'> fit </td>
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
	{{total}}
</div>
</template>

<style>
	table{
		table-layout: fixed;
	}
	td,th {
		width: 6%;
	}
	td{
		text-align: center;
		font-size: 1.5em;
		background-color: #ddd
	}
	.result{
		font-weight: bold;
		font-size: 2em
	}
</style>

<script>

	import {format, formatString} from './utils'

	export default {
		props: ['grille', 'mel'],
		computed: {
			grilles () {
				var res = []
				var grille = formatString(this.grille)
				for (var i = 0; i < grille.length; i++) {
					res.push(this.move(grille, i))
				}
				return res
			},
			tabs () {
				var res = []
				var mel = formatString(this.mel)
				console.log(mel)
				for (var i = 0; i < this.grilles.length; i++) {
					res.push([])
					for (var j = 0; j < mel.length; j++) {
						var note = parseInt(mel[j])
						var distance = (note % 7) - this.grilles[i][j % this.grille.length]
						res[i].push(format(distance))
					}
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
			},
			total () {
				return this.results.reduce((a, b) => { return a + b })
			}
		},
		methods: {
			formatString,
			move (grille, n) {
				var dep = grille.split('').map(v => { return parseInt(v) })
				var res = []
				for (var i = 0; i < dep.length; i++) {
					res.push(dep[(i + n) % dep.length])
				}
				return res
			},
			isVector (indexGrille, indexNote) {
				var n = this.tabs[indexGrille][indexNote]
				var res = (n === 0 || n === 2 || n === 4)
				return res
			}
		}
	}
</script>
