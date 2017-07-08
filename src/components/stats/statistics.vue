<template>	
<div>
	<header>
		<div class="inputs">		
			<div>			
				<input type="telefon" v-model='grille'>
				<button @click="swap">swap</button>
				<input type="telefon" v-model='mel'>
			</div>
			<div id="rythmes">				
				<input type="text" v-model="rythmeGrille">
				<input type="text" v-model="rythmeMel">
				<input type="number" v-model.number="duration">
			</div>
		</div>	
	</header>
		<div class="inversions">
			<setting titre="fail" v-model='grilleInverseBool'></setting>		
			<label >
				inverse grille
				<input type="checkbox" v-model='grilleInverseBool'>
			</label>
			<label > 
				reverse grille
				<input type="checkbox" v-model='grilleReverseBool'>
			</label>
			<label >
				inverse mel
				<input type="checkbox" v-model='melInverseBool'>
			</label>
			<label > 
				reverse mel
				<input type="checkbox" v-model='melReverseBool'>
			</label>
	</div>
	<div id="stats">
		<router-view 
			class='io'
			v-for = 'n in 6' :key=" n + 'stats_' "
			:transpose='n'
			:grille="grille | rythme(rythmeGrille) | reverse(grilleReverseBool) | inverse(grilleInverseBool) "
			:mel= "mel | rythme(rythmeMel) | until(duration) | reverse(melReverseBool) | inverse(melInverseBool) | add(n-1)"
			@select = "print($event)"
		><sub>harmo</sub>\<sup>mel</sup></router-view>
	</div> 
	<footer>
		<div id="fou"></div>	
		<midiButton></midiButton>
	</footer>
</div>
</template>

<style>

	.io{
		width: 30%;
		/*height: 20%;*/
	}
	footer{
		display: flex; 
		width: 100%;

		position: fixed;
		bottom: 0;
		z-index: 1;
		background-color: white;
		height: 100px;
		overflow: scroll;
	}
	.settings{
		display: flex;
		justify-content: center;
		margin: 5px
	}

	.inputs{
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		margin: 5px
	}
	.inputs #rythmes{
		display: flex;
	}

	.inversions{
		display: flex;
		justify-content: center;
	}
	#stats{
		height: 60%;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
	}
	#stats > *{
		/*width: 49%;*/
		border: 1px solid; 
		/*height: 150px;*/
	}

</style>

<script>

	import axios from 'axios'
	import {rotate, add, rythme, until} from './utils'
	import convert2ly from './lilypond'
	import midiButton from './midiButton.vue'
	import setting from './statsSettings.vue'

	export default {
		components: {setting, midiButton},
		data () {
			return {
				duration: 16,
				rythmeMel: '211',
				rythmeGrille: '4',
				melInverseBool: false,
				melReverseBool: false,
				grilleInverseBool: false,
				grilleReverseBool: false,
				mel: '0123456',
				grille: '0514'
			}
		},
		methods: {
			print ({indexGrille, transpose}) {
				var grille = rotate(rythme(this.grille, this.rythmeGrille), indexGrille)
				var mel = add(until(rythme(this.mel, this.rythmeMel), this.duration), transpose)
				mel = convert2ly(mel, this.rythmeMel, this.duration)
				console.log(grille)
				grille = convert2ly(grille, this.rythmeGrille, this.duration)
				console.log(grille)
				this.getLilypond(mel, grille)
			},
			getLilypond (mel, basse) {
				axios.post('/lilypond', {
					mel, basse
				}).then(response => {
					this.createSVG(response.data)
				})
			},
			createSVG (string) {
				var div = document.querySelector('footer #fou')
				div.innerHTML = string
			},
			swap () {
				var tmp = this.grille
				this.grille = this.mel
				this.mel = tmp
			}
		},
		filters: {
			add,
			until,
			rythme,
			inverse (grille, bool) {
				if (bool) {
					var res = ''
					for (var i = grille.length - 1; i >= 0; i--) {
						res += grille[i]
					}
					return res
				} else {
					return grille
				}
			},
			reverse (grille, bool) {
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
		}
	}
</script>
