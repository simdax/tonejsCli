<template>
  <div class="hello">
    <in v-model='mel'></in>
    <in v-model='rythme'></in>
    <in v-model='scale'></in>
    <button @click="generate"> generate </button>
  </div>
</template>

<script>

import Tone from 'tone'
// import {mapActions} from 'vuex'
import store from '../store'
Tone.Transport.start()
import input from './input.vue'

let setComputed = (names) => {
  var result = {}
  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    !(function (name) {
          result[name] = {
            get () {
              return this.$store.state[this.ns][name]
            },
            set (value) {
              return this.$store.commit(this.ns + '/SET_' + name.toUpperCase(), value)
            }
          }
        }(name))
  }
  console.log(result)
  return result
}

export default {
  props: ['ns'],
  components: {in: input},
  created () {
    this.$store.registerModule(this.ns, store)
    this.sound = new Tone.AMSynth().toMaster()
  },
  computed: setComputed('mel,rythme,scale'.split(',')),
  methods: {
    generate () {
      var sequence = new Tone.Sequence((t, v) => {
        var freq = Tone.Frequency().midiToFrequency(60 + parseInt(v))
        this.sound.triggerAttackRelease(freq, 1)
      }, this.code.split(','))
      sequence.loop = false
      sequence.start()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello{
  display: flex;
  flex-flow: column;
  /*justify-content: center;*/
  align-items: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
