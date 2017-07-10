<template>	
<div>
	<header>
		<instruments></instruments>
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
	<main>
		<div class="inversions">
			<setting titre="inverse grille" v-model='grilleInverseBool'></setting>		
			<setting titre="reverse grille" v-model='grilleReverseBool'></setting>		
			<setting titre="inverse mel" v-model='melInverseBool'></setting>		
			<setting titre="reverse mel" v-model='melReverseBool'></setting>		
		</div>
		<div id="stats">
			<tab 
				class='io'
				v-for = 'n in 7' :key=" n + 'stats_' "
				:transpose='n'
				:grille="accords"
				:mel= "melodie | add(n-1)"
				@select = "print($event)"
			><sub>harmo</sub>\<sup>mel</sup>
			</tab>
		</div> 
	</main>
	<div class='log'>				
		<midi ref='midi'></midi>
	</div>
	<partition>	
		<footer>				
			<div id="partition"></div>	
			<midiButton></midiButton>
		</footer>
	</partition>
</div>
</template>

<style>

	.io{
		width: 30%;
		/*height: 20%;*/
	}
	partition{
		position: fixed;		
	}
	footer{
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

	import {mapActions} from 'vuex'
	import instruments from '../instruments/tonejsStore.vue'
	import midi from './midi'
	import axios from 'axios'
	import * as utils from './utils'
	import {convert2ly} from './lilypond'
	import {createChords, merge, addArray, rotate} from './lilypond_accords'
	import tab from './tab'
	import midiButton from './midiButton.vue'
	import setting from './setting.vue'
	import partition from './partition.vue'

	export default {
		components: {setting, midiButton, partition, instruments, midi, tab},
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
			accords () {
				return this.filter(this.grille, this.rythmeGrille, this.grilleReverseBool, this.grilleInverseBool)
			},
			melodie () {
				return this.filter(this.mel, this.rythmeMel, this.melReverseBool, this.melInverseBool)
			},
			basse () {
				return createChords(this.accords)
			},
			merged () {
				var res = [[0, 2, 4]]
				for (var i = 1; i < this.basse.length; i++) {
					res.push(merge(res[i - 1], this.basse[i]))
				}
				return res
			}
		},
		methods: {
			...mapActions(['setMidi']),
			filter (mel, rythme, reverse, inverse) {
				var res = mel
				// console.log('mel', res)
				res = utils.until(res, this.duration)
				// console.log('until', res)
				res = utils.rythme(res, rythme)
				// console.log('rythme', res)
				res = utils.until(res, this.duration)
				// console.log('until', res)
				if (reverse) {
					res = utils.reverse(res)
					// console.log('rev', res)
				}
				if (inverse) {
					res = utils.inverse(res)
					// console.log('inv', res)
				}
				return res
			},
			print ({indexGrille, transpose}) {
				transpose -= 1
				var mel = convert2ly(utils.add(this.melodie, transpose))
				var grille = convert2ly(utils.rotate(this.accords, indexGrille))
				var accords = convert2ly(rotate(this.merged, indexGrille))
				this.getLilypond(mel, grille, accords, addArray)
			},
			populateMidi () {
				axios.get('/lilypond/midi').then((res) => {
					this.setMidi(res.data)
					// this.$store.state.midi = res.data
					// this.populate()
				})
			},
			getLilypond (mel, basse, accords) {
				var div = document.querySelector('#partition')
				div.innerHTML = 'loading'
				axios.post('/lilypond', {
					mel, basse, accords
				}).then(response => {
					this.populateMidi()
					this.createSVG(response.data)
				})
			},
			createSVG (string) {
				var div = document.querySelector('#partition')
				div.innerHTML = string
			},
			swap () {
				var tmp = this.grille
				this.grille = this.mel
				this.mel = tmp
			}
		},
		filters: {
			add: utils.add
		}
	}
</script>
