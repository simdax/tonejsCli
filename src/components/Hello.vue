<template>
  <div class="hello">
    <textarea v-model="code"></textarea>
    <button @click="generate"> generate </button>
  </div>
</template>

<script>

import Tone from 'tone'

Tone.Transport.start()
var sound = new Tone.AMSynth().toMaster()
global.t = Tone

export default {
  name: 'hello',
  methods: {
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
  },
  data () {
    return {
      code: ''
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
