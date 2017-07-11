const routes = require('express').Router()

var child_process = require('child_process')
var fs = require('fs')
var MidiConvert = require('midiconvert')

const lilypondMain = require ('../lilypond') 

routes.post('/lilypond', lilypondMain)

routes.get('/lilypond/midi', function (req, res, next) {
	console.log('yayaya')
	fs.readFile("lilypond/tmp.midi", "binary", function(err, midiBlob) {
	  if (!err) {
	    var midi = MidiConvert.parse(midiBlob)
			// console.log("io", midi)
	    res.send(midi)
	  }
	})
})

module.exports = routes