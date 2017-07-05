export default {
	namespaced: true,
	state () {
		return {
			mel: '',
			rythme: '',
			scale: ''
		}
	},
	// getters: {
	// 	code: s => {
	// 		return s.code
	// 	}
	// },
	mutations: {
		SET_MEL (s, val) {
			s.mel = val
		},
		SET_RYTHME (s, val) {
			s.rythme = val
		},
		SET_SCALE (s, val) {
			s.scale = val
		}
	}
}
