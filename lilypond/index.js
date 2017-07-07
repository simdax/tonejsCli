var child_process = require('child_process')
var fs = require('fs')

function lilypond() {	
	var outName = 'lilypond'
	var cmdLine = ` echo {a b c d} | lilypond -dbackend=svg -o ${outName} - `
	child_process.exec(cmdLine, (err, stdout, stderr) => {
		if (!err) {
			fs.readFile(outName+'.svg', 'utf8', (err, data) => {
					console.log('pas d erreur')
					return data
			})
		}
	})
}

module.exports = lilypond