const routes = require('express').Router()

var child_process = require('child_process')
var fs = require('fs')

// const lilypond = require ('../lilypond') 

routes.post('/lilypond', function(req, res, next){
	var mel = req.body.mel
	var basse = req.body.basse
	// console.log(mel, basse, req.body)
	var include =	
	`%% generated include
		mel = ${mel}
		basse = ${basse}
		basseAccords = \\chordmode ${basse}
	`;
	fs.writeFile('lilypond/includes.ly', include, (err) => {
		var outName = 'lilypond/tmp'
		var cmdLine = `lilypond -dbackend=svg -o ${outName} lilypond/template.ly`
		child_process.exec(cmdLine, (err, stdout, stderr) => {
			// console.log(err, stdout)
			if (!err) {
				fs.readFile(outName+'.svg', 'utf8', (err, data) => {
					res.send(data)
				})
			}
		})
	})
})

module.exports = routes