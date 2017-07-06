<template>	
<div>
	<div id="inputs">		
		<input type="telefon" v-model='grille'>
		<input type="telefon" v-model='mel'>
		<input type="number" v-model.number='melTranspose'>
		<input type="number" v-model.number='grilleTranspose'>
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
			:grille="grille | inverse(grilleInverseBool) | reverse(grilleReverseBool) | add(grilleTranspose)"
			:mel= "mel | inverse(melInverseBool) | reverse(melReverseBool) | add(melTranspose)"
		></router-view>
	</div> 
</div>
</template>

<style>
	
	#inputs{
		display: flex;
		justify-content: center;
		margin: 5px
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

	export default {
		// components: {stats},
		data () {
			return {
				melTranspose: 0,
				grilleTranspose: 0,
				melInverseBool: false,
				melReverseBool: false,
				grilleInverseBool: false,
				grilleReverseBool: false,
				mel: '0123456',
				grille: '0514'
			}
		},
		filters: {
			add (grille, n) {
				return grille.split('').map(v => { return parseInt(v) + n }).join().replace(/,/g, '')
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
					return res.join().replace(/,/g, '')
				} else {
					return grille
				}
			}
		}
	}
</script>
