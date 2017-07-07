<template>
	<button @click="go">PLAY MIDI</button>
</template>

<script>

	import axios from 'axios'
	import Tone from 'tone'

	export default {
		methods: {
			go () {
				axios.get('/lilypond/midi').then((res) => {
					this.play(res.data)
				})
			},
			play (midi) {
					var synth = new Tone.PolySynth(8).toMaster()
				  Tone.Transport.bpm.value = midi.header.bpm
				  Tone.Transport.start()
				  console.log(midi.tracks)
				  for (var i = 0; i < midi.tracks.length; i++) {
					  new Tone.Part(function (time, note) {
					    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
					  }, midi.tracks[i].notes).start()
				  }
				}
			}
	}
</script>
