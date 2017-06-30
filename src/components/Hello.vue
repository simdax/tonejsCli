<template>
  <div class="hello">
    <input v-model="code" @input="setCode($event.target.value)"/>
    <button @click="generate"> generate </button>
  </div>
</template>

<script>

import Tone from 'tone'
import {mapGetters, mapActions} from 'vuex'

Tone.Transport.start()
var sound = new Tone.AMSynth().toMaster()
global.t = Tone

export default {
  computed: {
    ...mapGetters(['code'])
  },
  methods: {
    ...mapActions(['setCode']),
    generate () {
      // console.log(Tone.Notation('A4').toMidi())
      sound.triggerAttackRelease(70, 1)
      var sequence = new Tone.Sequence((t, v) => {
        var freq = Tone.Frequency().midiToFrequency(60 + parseInt(v))
        console.log(v)
        sound.triggerAttackRelease(freq, 1)
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
