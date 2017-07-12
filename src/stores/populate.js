import Tone from 'tone'
import {isEmpty} from 'lodash'

// WTF padded blocks ???
/* eslint-disable padded-blocks */

export function setMidi (s, {midi, dur}) {

	s.commit('SET_MIDI', midi)
  Tone.Transport.bpm.value = s.state.midi.header.bpm
  Tone.Transport.start()

	if (isEmpty(s.state.parts)) {
		s.dispatch('populate')
	} else {
		s.dispatch('setPart', dur)
	}
}

export function setPart ({state}, dur) {
	// console.log(state, dur)
	// here's
	  for (var i = 2; i < state.midi.tracks.length; i++) {
	  	var track = state.midi.tracks[i]
			var part = state.parts[i - 2]
			// console.log(track, part, state.midi, state.parts, i)
			part.removeAll()
  		for (var j = 0; j < track.notes.length; j++) {
  			part.add(track.notes[j])
  		}
  		part.loopEnd = `16n * ${dur}`
  	}
}

export function	populate (s) {
  // we avoid the first two tracks
  //  control and chord names
  for (var i = 2; i < s.state.midi.tracks.length; i++) {
  	!(function (i) {
  		var part = new Tone.Part((time, note) => {
	  		var synth = this.getters['timbres/synths'][i - 2]
		  	var pitch = note.name
		  	if (synth instanceof Tone.Sampler) {
			  	pitch = Tone.Frequency(note.name).toMidi() - 60
		  	}
		    synth.triggerAttackRelease(pitch, note.duration, time, note.velocity)
		  }, this.state.midi.tracks[i].notes)
			part.loop = true
		  this.state.parts.push(part)
  	}.bind(s)(i))
  }
}
