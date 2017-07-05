<template>
  <div id="app">
    <img src="./assets/logo.png">
    <container ref="generator"></container>
    <button id="addCell" @click="$refs.generator.add()">add cell</button>
    <div id="settings">
      <input type="range" max="200" min="1" v-model='tempo' @input="setTempo">
      <button @click="toggle"> stop </button>
      <button @click="panic"> panic </button>
    </div>
  </div>
</template>

<style>
  #addCell{
    position: fixed;
    left: 0;
    top: 50%;
    width: 50px;
    height: 50px;
    background-color: tomato
  }
</style>

<script>

import Tone from 'tone'
import container from './container.vue'
global.t = Tone

export default {
  components: {container},
  name: 'app',
  data () {
    return {
      tempo: 100
    }
  },
  computed: {
    children () {
      return this.$refs.generator.$children
    }
  },
  methods: {
    setTempo () {
      Tone.Transport.bpm.value = this.tempo
    },
    stop () {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i]
        child.stop()
      }
      Tone.Transport.stop()
    },
    all () {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i]
        child.play()
      }
    },
    toggle () {
      // toggles all if one is stopped, else stop all
      loop: {
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i]
          if (child.sequence.state === 'stopped') {
            this.all()
            break loop
          }
        }
        this.stop()
      }
    },
    panic () {
      this.stop()
      Tone.context.close()
      Tone.context = new AudioContext()
      Tone.Transport.stop()
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i]
        child.create()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
