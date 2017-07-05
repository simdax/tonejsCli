<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view ns="bob"></router-view>
    <router-view ns="bib"></router-view>
    <div id="settings">
      <input type="range" max="200" min="1" v-model='tempo' @change="setTempo">
      <button @click="toggle"> stop </button>
      <button @click="panic"> panic </button>
    </div>
  </div>
</template>

<script>

import Tone from 'tone'
global.t = Tone

export default {
  name: 'app',
  data () {
    return {
      tempo: 100
    }
  },
  methods: {
    setTempo () {
      Tone.Transport.bpm.value = this.tempo
    },
    stop () {
      for (var i = 0; i < this.$children.length; i++) {
        var child = this.$children[i]
        child.stop()
      }
    },
    all () {
      for (var i = 0; i < this.$children.length; i++) {
        var child = this.$children[i]
        child.play()
      }
    },
    toggle () {
      // toggles all if one is stopped, else stop all
      var children = this.$children
      loop: {
        for (var i = 0; i < children.length; i++) {
          var child = children[i]
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
      var children = this.$children
      Tone.context.close()
      Tone.context = new AudioContext()
      for (var i = 0; i < children.length; i++) {
        var child = children[i]
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
