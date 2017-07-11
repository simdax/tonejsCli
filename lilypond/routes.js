var routes = require('express').Router()
const lilypond = require('./api') 

routes.post('/lilypond', lilypond.main)
routes.get('/lilypond/midi', lilypond.midi)

module.exports = routes