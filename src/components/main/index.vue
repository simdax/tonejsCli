<template>
  <div id="app">
    <div id="settings">
      <input type="range" max="200" min="1" v-model='tempo'>
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

export default {
  name: 'app',
  data () {
    return {
      tempo: 10
    }
  },
  computed: {
    children () {
      return this.$store.getters.mels
    }
  },
  watch: {
    tempo () {
      Tone.Transport.bpm.value = this.tempo
    }
  },
  methods: {
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
  #settings{
     background: url(../../assets/logo.png);
     /*position: absolute;*/
     top: 0;
     height: 150px;
     width: 50%;
     margin: auto;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
