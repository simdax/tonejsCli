<template>	
<div>
	<div id="inputs">		
		<input type="telefon" v-model='grille'>
		<input type="telefon" v-model='mel'>
	</div>
	<div id="stats">
		<stats :grille="grille" :mel="mel">grille d'accord \ mel</stats>
		<stats :grille="grille | inverse" :mel="mel">grille inversée</stats>
		<stats :grille="grille" :mel="mel | inverse">mel inversée</stats>
		<stats :grille="grille | renverse" :mel="mel">grille renversée</stats>
		<stats :grille="grille" :mel="mel | renverse">mel renversée</stats>
		<stats :grille="grille | inverse | renverse" :mel="mel">grille renversée et inversée</stats>
		<stats :grille="grille" :mel="mel | inverse | renverse">mel renversée et inversée</stats>
	</div>
</div>
</template>

<style>
	
	body{
		font-size: 0.5rem
	}
	#inputs{
		display: flex;
		justify-content: center;
		margin: 5px
	}
	#stats{
		display: flex;
		flex-flow: row wrap;
	}
	#stats *{
		width: 49%;
		border: 1px solid; 
	}
	#stats > *{
		height: 150px;
	}

</style>

<script>

import stats from './statsTab.vue'

	export default {
		components: {stats},
		data () {
			return {
				mel: '0123456',
				grille: '0514'
			}
		},
		filters: {
			inverse (grille) {
				var res = ''
				for (var i = grille.length - 1; i >= 0; i--) {
					res += grille[i]
				}
				return res
			},
			renverse (grille) {
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
			}
		}
	}
</script>
