import Tone from 'tone'
import {filter} from 'lodash'

export default {
  namespaced: true,
  getters: {
    parts (s, getters) {
      var res = []
      for (var key in s) {
	res.push(getters[key + '/synth'])
      }
      return res
    },
    partsForSynthIndex (s, getters) {
      console.log(s)
      return (index) => {
	return filter(s, v => { return v.indexTimbre === index })
      }
    }
  },
  actions: {
    toggleAll ({state, dispatch}) {
      // toggles all if one is stopped, else stop all
      loop: {
	for (var k in state) {
	  if (state[k].state === 'stopped') {
	    Tone.Transport.start()
     	    dispatch('playAll')
	    break loop
	  }
	}
	dispatch('stopAll')
      }
    },
    playAll ({state, dispatch}) {
      for (var k in state) {
	dispatch(`${k}/play`)
		}
      },
      stopAll ({state, dispatch}) {
	Tone.Transport.stop()
	for (var k in state) {
	  dispatch(`${k}/stop`)
		  }
	}
      }
    }
