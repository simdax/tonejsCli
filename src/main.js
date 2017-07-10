// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import router from './router'

import {findKey} from 'lodash'

Vue.use(VueX)

// global interface to app
const store = new VueX.Store({
	getters: {
		timbres (s) {
			var res = []
			for (var key in s.timbres) {
				if (key !== 'nb') {
					res.push(s.timbres[key])
				}
			}
			return res
		}
	},
	mutations: {
		ADD_TIMBRE (s, index) {
			var timbre = require('./stores/instruments').default
			store.registerModule(['timbres', s.timbres.nb], timbre)
			s.timbres.nb++
		},
		DEL_TIMBRE (s, hash) {
			var index = findKey(s.timbres, (v) => { return v.hash === hash })
			store.unregisterModule(['timbres', String(index)])
		}
	},
	actions: {
		addTimbre ({getters, commit}) {
			commit('ADD_TIMBRE', getters.lastIndex + 1)
		},
		delTimbre ({commit}, hash) {
			commit('DEL_TIMBRE', hash)
		},
		setCode ({commit}, val, ns) {
			commit(ns + '/SET_CODE', val)
		}
	},
	modules: {
		timbres: {
			namespaced: true,
			getters: {
				findHash (s) {
  				return (hash) => {
						return findKey(s, (v) => { return v.hash === hash })
					}
				}
			},
			actions: {
				setTimbre ({getters, dispatch}, {hash, val}) {
					var index = getters.findHash(hash)
					console.log(hash)
					console.log(index)
					dispatch(index + '/set', val)
				}
			},
			state: {
				nb: 0
			}
		}
	}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: `
		<router-view></router-view>
  `,
  components: { App }
})
