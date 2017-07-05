<template>

	<div>
		<h1> salut mec !</h1>
		<div v-for="n,k in options">
			<p>{{k}}</p>
			<input  v-model="options[k]" @keydown.13="set(k)">		
		</div>
	</div>
	
</template>

<script>
	
	import Tone from 'tone'

	let options = {
					partials: [1, 2],
					type: 'sine',
					modulationFrequency: 0.5,
					modulationType: 'sawtooth',
					width: 0.2,
					count: 1,
					spread: 0,
					harmonicity: 1
				}
	export default{
		data () {
			return {
				options,
				timbre: new Tone.OmniOscillator('A4').toMaster()
			}
		},
		created () {
			this.timbre.start()
		},
		methods: {
			set (k) {
				console.log(k, this.options[k])
				if (k === 'partials') { this.options[k] = this.options[k].split(',') }
				this.timbre.set(k, this.options[k])
			}
		}
		// watch: setWatch()
	}
</script>
