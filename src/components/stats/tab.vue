<template>
<div>
	<div class="table">
		<div class="thead tr">
			<div class="tr">
				<div class="th"> <slot></slot> </div>
				<div class="td" v-for="n in formatString(mel)"> {{ n }} </div>
				<div class='td result'> fit </div>
			</div>
		</div>
		<div class='tbody'>
				<div class="tr" v-for='(grille,indexGrille) in grilles' @click='$emit("select", {indexGrille, transpose})'>
					<div class="th">{{ grille }}</div>
					<div class ="td" v-for='(note,indexNote) in mel' 
					:style='{ backgroundColor : vectors[indexGrille][indexNote] ? "blue" : "red" }'>
					{{ tabs[indexGrille][indexNote] }}
				</div>
				<div class="td result">{{ results[indexGrille] }} % </div>
			</div>
		</div>
	</div>
	{{total}}
</div>
</template>

<style>
	.table{
		/*table-layout: fixed;*/
		display: flex;
		flex-flow: column;
		font-size: 0.1em;
	}
	.tr{
		width: 100%;
		display: flex;
	}
	.thead{
		height: 2%;
		width: 100%;
		font-weight: bold;
	}
	.tbody .th{
		color: transparent;
	}
	.td,.th {
		width: 6%;
		height: 10px;
	}
	.tbody .tr:hover .td{
		cursor: pointer;
		color: yellow
	}
	.td{
		text-align: center;
		/*font-size: 1.5em;*/
		background-color: #ddd
	}
	.result{
		font-weight: bold;
		font-size: 2em
	}
</style>

<script>

	import {format, formatString, rotate} from '@/utils'

	export default {
		props: ['grille', 'mel', 'transpose'],
		computed: {
			grilles () {
				var res = []
				var grille = formatString(this.grille)
				for (var i = 0; i < grille.length; i++) {
					res.push(rotate(grille, i))
				}
				return res
			},
			tabs () {
				var res = []
				var mel = formatString(this.mel)
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
			isVector (indexGrille, indexNote) {
				var n = this.tabs[indexGrille][indexNote]
				var res = (n === 0 || n === 2 || n === 4)
				return res
			}
		}
	}
</script>
