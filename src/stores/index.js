
import {populate, setPart, setMidi} from './populate'
import {findKey, filter} from 'lodash'
import Tone from 'tone'

import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)

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
			s.midi = val
		},
		SET_TIMBRE ({commit}, {synth, mel}) {
			commit(`mels/${mel}/SET_TIMBRE`, synth)
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
		mels: {
			namespaced: true,
			getters: {
				// parts (s, getters) {
				// 	console.log('oui???')
				// 	var res = []
				// 	for (var key in s) {
				// 		res.push(getters[key + '/part'])
				// 	}
				// 	return res
				// },
				partsForSynthIndex (s, getters) {
					console.log(s)
					return (index) => {
						console.log(s)
						return filter(s, v => { return v.indexTimbre === index })
					}
				}
			}
		},
		timbres: {
			namespaced: true,
			getters: {
				findHash (s) {
  				return (hash) => {
						return findKey(s, (v) => { return v.hash === hash })
					}
				},
				synths (s) {
					var res = filter(s, (val, key) => {
						return (key !== 'nb')
					}).map(v => { return v.toneSynth })
					return res.length === 0 ? [new Tone.Synth().toMaster()] : res
				}
			},
			actions: {
				setTimbre ({getters, dispatch, rootGetters}, {hash, index, val}) {
					var indexHash = getters.findHash(hash)
					dispatch(indexHash + '/set', val)
					console.log(rootGetters['mels/partsForSynthIndex'](index))
				}
			},
			state: {
				nb: 0
			}
		}
	}
})

export default store
