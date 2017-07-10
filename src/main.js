// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import router from './router'

import {populate, setPart, setMidi} from '@/components/stats/populate'
import {findKey, filter} from 'lodash'

Vue.use(VueX)

// global interface to app
const store = new VueX.Store({
	state: {
		midi: {},
		parts: []
	},
	getters: {
		parts (s) {
			return s.parts
		},
		midi (s) {
			return s.midi
		},
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
		SET_MIDI (s, val) {
			console.log(val)
			s.midi = val
		},
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
		populate,
		setPart,
		setMidi,
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
				},
				synths (s) {
					return filter(s, (val, key) => {
						return (key !== 'nb')
					}).map(v => { return v.toneSynth })
				}
			},
			actions: {
				setTimbre ({getters, dispatch}, {hash, val}) {
					var index = getters.findHash(hash)
					console.log(hash, val)
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
