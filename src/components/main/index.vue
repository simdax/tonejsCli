<template>
  <div id="app">
    <div id="settings">
      <input type="range" max="200" min="1" v-model='tempo'>
      <button @click="toggle"> stop </button>
      <button @click="panic"> panic </button>
    </div>
    <transport></transport>
    <!-- <log>{{ children }}</log> -->
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
import {mapGetters, mapActions} from 'vuex'
import log from '#/general/log'
import transport from './transport'

export default {
  name: 'app',
  components: {log, transport},
  data () {
    return {
      tempo: 60
    }
  },
  created () {
    Tone.Transport.bpm.value = this.tempo
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
    ...mapActions('mels', {
      stop: 'stopAll',
      toggle: 'toggleAll'
    }),
    panic () {
      this.stop()
      Tone.Transport.stop()
      // en mode gros bourrin de ouf
      // Tone.context.close()
      // Tone.context = new AudioContext()
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
