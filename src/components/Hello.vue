<template>
  <div class="hello">
    <input v-model="code"/>
    <button @click="generate"> generate </button>
  </div>
</template>

<script>

import Tone from 'tone'
// import {mapActions} from 'vuex'
import store from '../store'
Tone.Transport.start()

export default {
  props: ['ns'],
  created () {
    this.$store.registerModule(this.ns, store)
    this.sound = new Tone.AMSynth().toMaster()
  },
  computed: {
    // ...mapGetters(['code'])
    code: {
      get () {
        return this.$store.state[this.ns].code
      },
      set (value) {
        return this.$store.commit(this.ns + '/SET_CODE', value)
      }
    }
  },
  methods: {
    // ...mapActions(['setCode']),
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
