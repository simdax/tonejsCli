// kind of helpers

// this is for vuex initialization
export default function setComputed (names) {
  var result = {}
  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    !(function (name) {
        result[name] = {
          get () {
            return this.$store.state.mels[this.ns][name]
          },
          set (value) {
            this.$store.commit('mels/' + this.ns + '/SET_' + name.toUpperCase(), value)
          }
        }
      })(name)
    }
  return result
}

