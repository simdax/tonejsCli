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

<script>

	import {mapActions} from 'vuex'

	// vues
	import instruments from '#/instruments/index'
	import midiButton from './midiButton'
	import setting from './setting'
	import partition from './partition'
	import tab from './tab'
	import midi from './midi'
	let	components = {setting, midiButton, partition, instruments, midi, tab}
	
	// utils
	import * as utils from './utils'
	import {createChords, merge} from './lilypond/accords'
	import print from './lilypond/print'

	export default {
		components,
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
			print,
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

<style src='./mainStyle.css'></style>
