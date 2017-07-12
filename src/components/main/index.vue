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
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      tempo: 10
    }
  },
  computed: {
    ...mapGetters('mels', {
      children: 'parts'
    })
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
        child.start()
      }
    },
    toggle () {
      // toggles all if one is stopped, else stop all
      loop: {
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i]
          if (child.state === 'stopped') {
            Tone.Transport.start()
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
      // for (var i = 0; i < this.children.length; i++) {
      //   var child = this.children[i]
      //   child.create()
      // }
    }
  }
}
</script>

<style>
  #settings{
    background: url(../../assets/logo.svg);
    background-size: contain;
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
