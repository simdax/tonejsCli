
import {convert2ly} from './lilypond'
import {addArray, rotate} from './lilypond_accords'
import axios from 'axios'
import {add as add2, rotate as rotate2} from './utils'

// import {mapActions} from 'vuex'
// let setMidi = mapActions(['setMidi']).setMidi
// console.log(setMidi)

export default function print ({indexGrille, transpose}) {
				transpose -= 1
				var mel = convert2ly(add2(this.melodie, transpose))
				var grille = convert2ly(rotate2(this.accords, indexGrille))
				var accords = convert2ly(rotate(this.merged, indexGrille))
				// you have to bind for vuex bindings
				getLilypond.bind(this)(mel, grille, accords, addArray)
			}

function getLilypond (mel, basse, accords) {
				var div = document.querySelector('#partition')
				div.innerHTML = 'loading'
				axios.post('/lilypond', {
					mel, basse, accords
				}).then(response => {
					populateMidi.bind(this)()
					createSVG(response.data)
				})
			}

function populateMidi () {
				axios.get('/lilypond/midi').then((res) => {
					this.setMidi(res.data)
				})
			}

function createSVG (string) {
				var div = document.querySelector('#partition')
				div.innerHTML = string
			}

