<template>	
<div>
	<div class="inputs">		
		<div>			
			<input type="telefon" v-model='grille'>
			<button @click="swap">swap</button>
			<input type="telefon" v-model='mel'>
			<input type="number" min="0" max="6" v-model.number='melTranspose'>
		</div>
		<div id="rythmes">				
			<input type="text" v-model="rythmeGrille">
			<input type="text" v-model="rythmeMel">
			<input type="number" v-model.number="duration">
		</div>
	</div>	
		<div class="inversions">
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
			:grille="grille | rythme(rythmeGrille) | reverse(grilleReverseBool) | inverse(grilleInverseBool) "
			:mel= "mel | rythme(rythmeMel) | until(duration) | reverse(melReverseBool) | inverse(melInverseBool) | add(melTranspose)"
		><sub>harmo</sub>\<sup>mel</sup></router-view>
	</div> 
</div>
</template>

<style>

*{
	margin: 1px 5px;
	padding: 1px 5px;
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

	import {format} from './utils'

	export default {
		data () {
			return {
				duration: 16,
				rythmeMel: '1111',
				rythmeGrille: '1111',
				melTranspose: 0,
				melInverseBool: false,
				melReverseBool: false,
				grilleInverseBool: false,
				grilleReverseBool: false,
				mel: '0123456',
				grille: '0514'
			}
		},
		methods: {
			swap () {
				var tmp = this.grille
				this.grille = this.mel
				this.mel = tmp
			}
		},
		filters: {
			until (grille, dur) {
				var res = ''
				for (var i = 0; i < dur; i++) {
				  res += grille[i % grille.length]
				}
				return res
			},
			rythme (grille, rythmes) {
				var res = ''
				for (var i = 0; i < grille.length; i++) {
					var rythme = rythmes[i % rythmes.length]
					for (var j = 0; j < parseInt(rythme); j++) {
						res += grille[i]
					}
				}
				return res
			},
			add (grille, n) {
				var res = grille.split('').map(v => { return parseInt(v) + n })
				res = res.map(v => { return format(v) })
				return res.join().replace(/,/g, '')
			},
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
