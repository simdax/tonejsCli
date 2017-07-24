import * as _ from 'lodash'

class Rhythm {

  constructor () {

  }
  random (n) {
    return _.times(n, () => _.sample(['-', '+']))
    // return this.set(times(n, random(1, 2)))
  }
  // by groups
  setByGroups (groups, notes) {
    var res = []
    for (var i = 0; i < groups.length; i++) {
      res.push([])
      var group = groups[i]
      for (var j = 0; j < group; j++) {
        var note = notes[j % notes.length]
        if (j < group - 1) {
	  res[i * 2].push(note)
        } else {
          res.push(note)
        }
      }
    }
    return res
  }
}

export default Rhythm
