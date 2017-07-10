import Tone from 'tone'

let state = () => {
	return {
		hash: Math.random(),
		timbre: 'synth',
		toneSynth: new Tone.Synth()
	}
}
let getters = {
	timbre (s) {
		return s.timbre
	},
	hash (s) {
		return s.hash
	}
}

let mutations = {
	SET_TIMBRE (s, val) {
		s.timbre = val
	},
	SET_TONE (s, val) {
		s.toneSynth = new Tone[val]()
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
	getters,
	actions,
	mutations
}
