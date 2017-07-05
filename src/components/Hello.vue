<template>
  <div class="hello">
    <in v-model='mel'>mel</in>
    <in v-model='rythme'>rythme</in>
    <in v-model='scale'>scale</in>
    <button @click="generate" v-text="state"></button>
  </div>
</template>

<script>

import Tone from 'tone'
import store from '../store'
import input from './input.vue'

Tone.Transport.start()
global.t = Tone

let createMel = (notes, rythmes) => {
  var res = []
  // console.log(notes, rythmes)
  for (var i = 0; i < rythmes.length; i++) {
    var rythme = rythmes[i]
    var array = []
    for (var j = 0; j < rythme; j++) {
      console.log((i * rythmes[i] + j) % notes.length)
      array.push(notes[(i * rythmes[i] + j) % notes.length])
    }
    // console.log(array)
    res.push(array)
  }
  return res
}

let setComputed = (names) => {
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

export default {
  props: ['ns'],
  components: {in: input},
  // data () {
  //   return {
  //     b: false
  //   }
  // },
  created () {
    this.$store.registerModule(this.ns, store)
    this.sound = new Tone.AMSynth().toMaster()
    this.sequence = new Tone.Sequence((t, v) => {
        // console.log(this.sequence.progress)
        // var index = 0
        // var note = this.mel[index] || 0
        var freq = Tone.Frequency().midiToFrequency(60 + parseInt(v))
        this.sound.triggerAttackRelease(freq, this.sequence.subdivision)
      }, ['0', ['1']])
    this.sequence.loop = false
  },
  computed: {
    ...setComputed('mel,rythme,scale'.split(',')),
    state () {
      return this.sequence.state
    }
  },
  methods: {
    setSequence () {
      this.sequence.removeAll()
      var mel = createMel(this.mel.split(','), this.rythme.split(','))
       console.log(mel)
      this.sequence.at(0, mel)
                 // console.log(this.sequence.at(0))
      // for (var i = 0; i < mel.length; i++) {
      // }
    },
    generate () {
      if (this.sequence.state === 'started') {
        this.sound.triggerRelease()
        this.sequence.stop()
      } else {
        this.sequence.start()
      }
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
