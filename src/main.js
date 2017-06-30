// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import router from './router'

Vue.use(VueX)

const store = new VueX.Store({
	state: {
		code: ''
	},
	getters: {
		code: s => {
			return s.state.code
		}
	},
	mutations: {
		SET_CODE (s, val) {
			s.code = val
		}
	},
	actions: {
		// set
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
