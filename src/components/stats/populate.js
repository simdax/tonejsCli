import Tone from 'tone'
import {isEmpty} from 'lodash'

export function setMidi (s, midi) {
	s.commit('SET_MIDI', midi)
	if (isEmpty(s.state.parts)) {
		console.log('on populate')
		s.dispatch('populate')
	} else {
		console.log('on set on the fly')
		s.dispatch('setPart')
	}
}

export function setPart ({state}) {
	  for (var i = 0; i < state.midi.tracks.length; i++) {
	  	var track = state.midi.tracks[i]
			var part = state.parts[i]
			part.removeAll()
  		for (var j = 0; j < track.notes.length; j++) {
  			part.add(track.notes[j])
  		}
  	}
}

export function	populate (s) {
	// state.parts.splice(0)
	// console.log(state, getters)
  Tone.Transport.bpm.value = s.state.midi.header.bpm
  Tone.Transport.start()
  for (var i = 0; i < s.state.midi.tracks.length; i++) {
  	!(function (i) {
  		var part = new Tone.Part((time, note) => {
	  		var synth = this.getters['timbres/synths'][i]
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
