
import convert2ly from './convert2ly'
import {addArray, rotate} from './accords'
import axios from 'axios'
import $ from 'jquery'
import {add as add2, rotate as rotate2} from '@/utils'

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
    // I use also the 'this' duration option
    this.setMidi({midi: res.data, dur: this.duration})
  })
}

function createSVG (string) {
  var svg = $(string)
  // svg.attr('width', 200)
  // svg.attr('height', 150)
  // svg.attr('viewBox', '0 0 250 300')
  svg.find('text:last-child').remove()
  $('#partition').empty().append(svg)
}

