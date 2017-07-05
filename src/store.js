export default {
	namespaced: true,
	state () {
		return {
			mel: '0,1',
			rythme: '2,2',
			scale: '0,2,4,7,9'
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
