// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
// import router from './router'

Vue.use(VueX)

// global interface to app
const store = new VueX.Store({
	actions: {
		setCode ({commit}, val, ns) {
			commit(ns + '/SET_CODE', val)
		}
	}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  template: '<App/>',
  components: { App }
})
