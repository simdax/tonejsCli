// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import router from './router'

Vue.use(VueX)

const store = new VueX.Store({
	state: {
		code: '0,1,2,3,4,5,1'
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
	},
	actions: {
		setCode ({commit}, val) {
			commit('SET_CODE', val)
		}
	}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
