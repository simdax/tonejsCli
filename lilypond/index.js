var child_process = require('child_process')
var fs = require('fs')

const lilypond = function(req, res, next){
	console.log('yououou ???')
	var mel = req.body.mel
	var basse = req.body.basse
	var accords = req.body.accords
	// console.log(mel, basse, req.body)
	var include =	
	`%% generated include
	%% prout de ouf
		mel = ${mel}
		basse = ${basse}
		basseAccords = ${accords}
	`;
	fs.writeFile('lilypond/includes.ly', include, (err) => {
		var outName = 'lilypond/tmp'
		var cmdLine = `lilypond -dbackend=svg -o ${outName} lilypond/template.ly`
		child_process.exec(cmdLine, (err, stdout, stderr) => {
			// console.log(err, stdout)
			if (!err) {
				fs.readFile(outName+'.svg', 'utf8', (err, data) => {
					// console.log(data)
					res.send(data)
				})
			}
		})
	})
}
module.exports = lilypond