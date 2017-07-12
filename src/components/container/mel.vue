<template>
  <div class="generator">
    <div class="close" @click="kill">X</div>
    <in v-model='mel' :placeholder="mel" >mel</in>
    <in v-model='rythme' :placeholder="rythme">rythme</in>
    <in v-model='scale' :placeholder="scale">scale</in>
    <div>      
      <span>timber</span>
      <select v-model="synth" @change='setTimbre'>
        <option v-for="timbre,k in timbres" :value="k" >{{k}}</option>
      </select>
    </div>
    <div>      
      <span>gain</span>
      <input type="range" min="-40" max="10" steps="1" v-model="volume"></range>
    </div>
    <button ref="but" @click="toggle" v-text="isPlaying" :style='style'></button>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import input from './input.vue'
import setComputed from './setComputed'

export default {
  props: ['ns'],
  components: {in: input},
  created () {
    this.$store.commit('ADD_MEL', this.ns)
  },
  data () {
    return {
      synth: 0
    }
  },
  computed: {
    ...mapGetters(['timbres']),
    // hence there is no way to give the prop value to
    // define a namespace, I have to tweek with a outter
    // function
    ...setComputed('mel,rythme,scale,volume'.split(',')),
    isPlaying () {
      return this.$store.getters[`mels/${this.ns}/isPlaying`]
    },
    style () {
      return {
        backgroundColor: this.isPlaying === 'started' ? 'red' : 'blue'
      }
    }
  },
  methods: {
    setTimbre () {
      var synth = this.$store.getters.timbres[this.synth].toneSynth
      this.$store.commit(`mels/${this.ns}/SET_SYNTH`, synth)
    },
    kill () {
      this.$store.dispatch(`mels/${this.ns}/stop`)
      this.$store.commit(`DEL_MEL`, this.ns)
      this.$emit('kill', this.ns)
    },
    toggle () {
      this.$store.dispatch(`mels/${this.ns}/toggle`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.close{

}
.generator{
  border: 1px solid;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
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
