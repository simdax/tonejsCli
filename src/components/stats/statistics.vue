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
				{{io}}
	</header>
	<main>
		<div class="inversions">
			<setting titre="inverse grille" v-model='grilleInverseBool'></setting>		
			<setting titre="reverse grille" v-model='grilleReverseBool'></setting>		
			<setting titre="inverse mel" v-model='melInverseBool'></setting>		
			<setting titre="reverse mel" v-model='melReverseBool'></setting>		
		</div>
		<div id="stats">
			<router-view 
				class='io'
				v-for = 'n in 6' :key=" n + 'stats_' "
				:transpose='n'
				:grille="grille | rythme(rythmeGrille) | reverse(grilleReverseBool) | inverse(grilleInverseBool) "
				:mel= "io | add(n-1)"
				@select = "print($event)"
			><sub>harmo</sub>\<sup>mel</sup></router-view>
		</div> 
	</main>
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
		position: fixed;
		display: flex; 
		width: 100%;
		height: 28%;
		bottom: 0;
		z-index: 1;
		background-color: white;
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
	import * as utils from './utils'
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
		computed: {
			io () {
				return	utils.inverse(utils.reverse(utils.until(utils.rythme(this.mel, this.rythmeMel), this.duration), this.melReverseBool), this.melInverseBool)
			}
		},
		methods: {
			print ({indexGrille, transpose}) {
				var grille = utils.rotate(utils.rythme(this.grille, this.rythmeGrille), indexGrille)
				var mel = this.io
				mel = convert2ly(mel, this.rythmeMel, this.duration)
				grille = convert2ly(grille, this.rythmeGrille, this.duration)
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
		filters: utils
	}
</script>
