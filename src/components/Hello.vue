<template>
  <div class="hello">
    <in v-model='mel' :placeholder="mel" >mel</in>
    <in v-model='rythme' :placeholder="rythme">rythme</in>
    <in v-model='scale' :placeholder="scale">scale</in>
    <input type="range" min="10" max="200" v-model="tempo" @change="setTempo"></range>
    <button @click="generate" v-text="state"></button>
  </div>
</template>

<script>

import Tone from 'tone'
import store from '../store'
import input from './input.vue'
import {createMel, setComputed} from './doMel'

Tone.Transport.start()
global.t = Tone

export default {
  props: ['ns'],
  components: {in: input},
  created () {
    this.$store.registerModule(this.ns, store)
    this.sound = new Tone.AMSynth().toMaster()
    this.sequence = new Tone.Sequence((t, v) => {
      var midi = parseInt(this.scale.split(',')[parseInt(v) % this.scale.length])
      var freq = Tone.Frequency().midiToFrequency(60 + midi)
      if (!isNaN(freq)) {
        this.sound.triggerAttackRelease(freq, this.sequence.subdivision)
      }
    }, ['0'])
    this.sequence.loop = true
  },
  data () {
    return {
      tempo: 120
    }
  },
  computed: {
    ...setComputed('mel,rythme,scale'.split(',')),
    state () {
      return this.sequence.state
    }
  },
  methods: {
    setTempo (v) {
      Tone.Transport.bpm.value = this.tempo
      console.log(Tone.Transport.bpm)
    },
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
