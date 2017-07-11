<template>
	<button @click="play">{{state}}</button>
</template>

<script>

	// import Tone from 'tone'
	import {mapGetters} from 'vuex'

	export default {
		data () {
			return {
				isPlaying: false
			}
		},
		computed: {
			...mapGetters(['parts']),
			state () {
				return this.isPlaying ? 'stop ?' : 'play ?'
			}
		},
		methods: {
			play () {
				if (this.isPlaying) {
					// Tone.Transport.cancel()
					this.parts.map(v => {
	     			v.stop()
					})
				} else {
					// Tone.Transport.start()
					this.parts.map(v => {
	     			v.start()
					})
				}
				this.isPlaying	= !this.isPlaying
			}
		}
	}
</script>
