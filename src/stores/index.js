
import {populate, setPart, setMidi} from './populate'
import {findKey} from 'lodash'

import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)

const store = new VueX.Store({
	state: {
		midi: {},
		parts: []
	},
	getters: {
		// parts (s) {
		// 	return s.parts
		// },
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
			s.midi = val
		},
		SET_TIMBRE ({commit}, {synth, mel}) {
			commit(`mels/${mel}/SET_SYNTH`, synth)
		},
		ADD_MEL (s, index) {
			var mel = require('./mels').default
			store.registerModule(['mels', index], mel)
		},
		DEL_MEL (s, ns) {
			// var index = findKey(s.timbres, (v) => { return v.hash === hash })
			store.unregisterModule(['mels', String(ns)])
		},
		ADD_TIMBRE (s, index) {
			var timbre = require('./timbres').default
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
		mels: require('./mels').default,
		timbres: require('./timbres').default
	}
})

export default store
