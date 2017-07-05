export default {
	namespaced: true,
	state () {
		return {
			code: '0,1,2,3,4,5,1'
		}
	},
	getters: {
		code: s => {
			return s.code
		}
	},
	mutations: {
		SET_CODE (s, val) {
			s.code = val
		}
	}
}
