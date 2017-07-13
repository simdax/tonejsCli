import Tone from 'tone'

let state = () => {
	return {
		hash: Math.random(),
		timbre: 'synth',
		toneSynth: new Tone.Synth().toMaster()
	}
}

let mutations = {
	SET_TIMBRE (s, val) {
		s.timbre = val
	},
	SET_TONE (s, val) {
		if (val.slice(0, 7) === '/static') {
			s.toneSynth = new Tone.Sampler(val, () => {
				console.log('chargé ', val)
			}).toMaster()
		} else {
			s.toneSynth = new Tone[val]().toMaster()
		}
	}
}

let actions = {
	set ({commit}, val) {
		commit('SET_TIMBRE', val)
		// todo verif
		commit('SET_TONE', val)
	}
}

export default {
	namespaced: true,
	state,
	// getters,
	actions,
	mutations
}
