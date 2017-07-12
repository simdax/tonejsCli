import Tone from 'tone'

let state = () => {
	return {
		hash: Math.random(),
		timbre: 'synth',
		toneSynth: new Tone.Synth().toMaster()
	}
}
// let getters = {
// 	timbre (s) {
// 		return s.timbre
// 	},
// 	hash (s) {
// 		return s.hash
// 	},
// 	synth (s) {
// 		return s.toneSynth
// 	}
// }

let mutations = {
	SET_TIMBRE (s, val) {
		s.timbre = val
	},
	SET_TONE (s, val) {
		if (val.slice(0, 4) === 'http') {
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
