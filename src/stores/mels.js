
import {rythme, string2array} from '@/utils'
import {cloneDeep} from 'lodash'
import Tone from 'tone'

function toNote (root, scale, index) {
	var res = scale[index % scale.length] + root
	return toFreq(res)
}
function toFreq (val) {
	return Tone.Frequency(val, 'midi').toFrequency()
}

export default {
	namespaced: true,
	state () {
		return {
			mel: '0,1',
			rythme: '2,2',
			scale: '0,2,4,7,9,12',
			root: 60,
			counter: 0,
			indexTimbre: 0,
			synth: new Tone.Synth().toMaster(),
			player: new Tone.Loop(),
			volume: 0.2,
			state: 'stopped'
		}
	},
	actions: {
    stop ({commit}) {
      commit('STOP')
    },
    play ({commit, getters}) {
      if (Tone.Transport.state === 'stopped') {
        Tone.Transport.start()
        commit('START')
      } else {
        commit('START', '@1m')
      }
    },
    toggle ({state, commit, dispatch, getters, rootGetters, rootState}) {
			if (state.player.callback === Tone.noOp) {
				commit('CREATE_PLAYER', getters.playingFunc)
			}
      if (getters.isPlaying === 'started') {
        dispatch('stop')
      } else {
        dispatch('play')
      }
    }
  },
	getters: {
		sequence (s, getters) {
			return rythme(s.mel, s.rythme)
		},
		isPlaying (s) {
			// worst bug ever... He can't catch the change
			// return state.player.state
			return s.state
		},
		playingFunc (state, getters, rootGetters, rootState) {
			return (time) => {
				var seq = getters.sequence
				var val = seq[state.counter % seq.length]
				var synth = state.synth
				var n = !(synth instanceof Tone.Sampler)
					? toNote(state.root, string2array(state.scale), parseInt(val))
					: parseInt(val)
				state.counter++
				console.log('TA MERE')
				synth.triggerAttackRelease(n, 1)
			}
		}
	},
	mutations: {
		START (s, quantize) {
			if (quantize) {
				s.player.start(quantize)
			} else {
				s.player.start()
			}
			s.state = 'started'
		},
		STOP (s) {
			s.player.stop()
			s.state = 'stopped'
		},
		CREATE_PLAYER (state, func) {
			state.player.callback = func
		},
		SET_SYNTH (s, val) {
			s.synth = cloneDeep(val)
		},
		SET_MEL (s, val) {
			s.mel = val
		},
		SET_RYTHME (s, val) {
			s.rythme = val
		},
		SET_SCALE (s, val) {
			s.scale = val
		},
		SET_VOLUME (s, val) {
			s.synth = val
		}
	}
}
