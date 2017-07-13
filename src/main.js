// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import store from './stores'

global.s = store

import Tone from 'tone'
global.Tone = Tone

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: `
  <div>
	  <div v-for="route in $router.options.routes">
			<router-link :to='route.path'>{{route.path}}</router-link>
	  </div>
		<router-view></router-view>
  </div>
  `
})
