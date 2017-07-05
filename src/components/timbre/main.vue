<template>

	<div>
		<h1> salut mec !</h1>
			<div v-for="n,k in options" v-if="test(k)" :key="k">
				<p>{{k}}</p>
				<transition enter-class="animated tada">				
						<input v-model="options[k]" @keydown.13="set(k)">		
				</transition>	
			</div>
			<freeverb @load="create" ref='effect' freeverb></freeverb>
	</div>
	
</template>

<style>		


</style>

<script>

	import 'animate.css'
	import Tone from 'tone'
	import freeverb from '@/components/timbre/freeverb'

	let options = {
		frequency: 400,
		detune: 0,
		partials: [1, 2],
		type: 'sine',
		modulationFrequency: 0.5,
		modulationType: 'sawtooth',
		phase: 0,
		width: 0.2,
		count: 1,
		spread: 0,
		harmonicity: 1
	}
	export default{
		components: {freeverb},
		data () {
			return {
				options,
				timbre: new Tone.OmniOscillator('A4')
			}
		},
		methods: {
			create () {
				setTimeout(() => {
					console.log(this.$refs.effect)
					var filter = this.$refs.effect.filter
					this.timbre.connect(filter)
					this.timbre.start()
				}, 200)
			},
			test (k) {
				switch (k) {
					case 'width':
						return this.options.type === 'pulse'
					case 'spread':
						return this.options.type === 'fat'
					case 'partials':
						return !(this.options.type === 'pulse' || this.options.type === 'pwm')
					case 'modulationType':
						return this.options.type === 'am' || this.options.type === 'fm'
					case 'modulationFrequency':
						return this.options.type === 'pwm'
					case 'harmonicity':
						return this.options.type === 'am' || this.options.type === 'fm'
					default:
						return true
				}
			},
			set (k) {
				console.log(k, this.options[k])
				if (k === 'partials') { this.options[k] = this.options[k].split(',') }
				this.timbre.set(k, this.options[k])
			}
		}
		// watch: setWatch()
	}
</script>
