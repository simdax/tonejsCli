<template>
	<button @click="go">{{state}}</button>
</template>

<script>

	import axios from 'axios'
	import Tone from 'tone'

	export default {
		data () {
			return {
				isPlaying: false,
				parts: []
			}
		},
		computed: {
			state () {
				return this.isPlaying ? 'stop ?' : 'play ?'
			}
		},
		methods: {
			go () {
				axios.get('/lilypond/midi').then((res) => {
					this.play(res.data)
				})
			},
			populate (midi) {
				this.parts.splice(0)
				var synth = new Tone.PolySynth(8).toMaster()
			  Tone.Transport.bpm.value = midi.header.bpm
			  Tone.Transport.start()
			  for (var i = 0; i < midi.tracks.length; i++) {
				  this.parts.push(new Tone.Part(function (time, note) {
				    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
				  }, midi.tracks[i].notes))
			  }
			},
			play (midi) {
				this.populate(midi)
				if (this.isPlaying) {
					Tone.Transport.cancel()
				} else {
					this.parts.map(v => { v.start() })
				}
				this.isPlaying	= !this.isPlaying
			}
		}
	}
</script>
