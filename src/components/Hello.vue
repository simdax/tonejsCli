<template>
  <div class="hello">
    <in v-model='mel' :placeholder="mel" >mel</in>
    <in v-model='rythme' :placeholder="rythme">rythme</in>
    <in v-model='scale' :placeholder="scale">scale</in>
    <input type="range" min="-40" max="10" steps="1" v-model="volume" @input="setGain"></range>
    <button ref="but" @click="generate" v-text="state" :style='style'></button>
  </div>
</template>

<script>

import Tone from 'tone'
import store from '../store'
import input from './input.vue'
import {createMel, setComputed} from './doMel'

export default {
  props: ['ns'],
  components: {in: input},
  created () {
    this.$store.registerModule(this.ns, store)
    this.create()
  },
  data () {
    return {
      volume: 0.2,
      active: false
    }
  },
  computed: {
    style () {
      return {
        backgroundColor: this.active ? 'red' : 'blue'
      }
    },
    state () {
      return this.sequence.state
    },
    ...setComputed('mel,rythme,scale'.split(','))
  },
  methods: {
    create () {
      this.sound = new Tone.AMSynth().toMaster()
      this.sequence = new Tone.Sequence((t, v) => {
        v = parseInt(v)
        var scale = this.scale.split(',')
        var note = v % (scale.length - 1)
        var octave = Math.floor(v / (scale.length - 1))
        var midi = parseInt(scale[note]) + scale[scale.length - 1] * octave
        var freq = Tone.Frequency().midiToFrequency(60 + midi)
        if (!isNaN(freq)) {
          this.sound.triggerAttackRelease(freq, this.sequence.subdivision)
        }
      }, this.mel.split(','), '4n')
      this.sequence.loop = true
    },
    setGain (v) {
      this.sound.volume.value = this.volume
    },
    setSequence () {
      this.sequence.removeAll()
      var mel = createMel(this.mel.split(','), this.rythme.split(','))
      // console.log(mel)
      this.sequence.at(0, mel)
    },
    stop () {
      this.sound.triggerRelease()
      this.sequence.stop()
      this.active = false
    },
    generate () {
      if (this.sequence.state === 'started') {
        this.stop()
      } else {
        if (Tone.Transport.state === 'stopped') {
          Tone.Transport.start()
          this.sequence.start()
        } else {
                    // this.sequence.start()
          this.sequence.start('@1m')
        }
        this.active = true
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
