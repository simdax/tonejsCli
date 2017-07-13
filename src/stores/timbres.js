import Tone from 'tone'
import {findKey, filter} from 'lodash'

export default {
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
					// console.log(rootGetters['mels/partsForSynthIndex'](index))
				}
			},
			state: {
				nb: 0
			}
		}
