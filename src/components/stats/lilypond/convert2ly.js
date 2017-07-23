import convert from './convertNote'

function createNote (pitch) {
  var note = ''
  if (Array.isArray(pitch)) {
    note += '<'
    for (var i = 0; i < pitch.length; i++) {
      note += createNote(pitch[i])
      if (i !== pitch.length - 1) { note += ' ' }
    }
    note += '>'
  } else {
    note = 'cdefgab'[convert(pitch)]
  }
  return note
}

function notation (mel, index) {
  var note
  if (Array.isArray(mel)) {
    note = createNote(mel)
  }	else {
    // console.log(mel)
    note = createNote(parseInt(mel))
    // console.log(note)
  }
  // okay okay .......
  var rules = [`${note}16`,
	       `${note}8`, `${note}8.`,
	       `${note}4`, `${note}4~${note}16`, `${note}4.`, `${note}4..`,
	       `${note}2`, `${note}2~${note}16`]
  var res = rules[index]
  // console.log(index, res)
  return res
}

import {isEqual} from 'lodash'

export default function convert2ly (grille) {
  // console.log(grille)
  var res = ''
  for (var i = 0; i < grille.length; i++) {
    var count = 0
    // console.log(grille[i + 1] === grille[i], grille[i + 1], grille[i])
    while (isEqual(grille[i + 1], grille[i])) {
      count++; i++
    }
    res += notation(grille[i], count) + ' '
    // console.log(res)
  }
  return '{ ' + res + '}'
}
