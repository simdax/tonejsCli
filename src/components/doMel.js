
// helper for

let setRythmes = (r) => {
  return r.map((v) => { return v === '' ? '3' : v })
}

export function createMel (notes, rythmes) {
  var res = []
  rythmes = setRythmes(rythmes)
  // console.log(rythmes)
  for (var i = 0; i < rythmes.length; i++) {
    var rythme = rythmes[i]
    var array = []
    for (var j = 0; j < rythme; j++) {
      var index = (i * rythmes[i] + j) % notes.length
      // var octave = Math.round((i * rythmes[i] + j) / notes.length)
      // console.log(notes[index])
      array.push(notes[index])
    }
    // console.log(array)
    res.push(array)
  }
  // console.log(res)
  return res
}

// this is for vuex initialization
export function setComputed (names) {
  var result = {}
  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    !(function (name) {
        result[name] = {
          get () {
            // console.log('tu te brancles ??', this.$store.state[this.ns][name])
            return this.$store.state[this.ns][name]
          },
          set (value) {
            this.$store.commit(this.ns + '/SET_' + name.toUpperCase(), value)
            this.setSequence()
          }
        }
      })(name)
    }
  return result
}

