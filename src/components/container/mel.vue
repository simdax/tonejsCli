<template>
  <div class="generator">
    <div class="close" @click="kill">X</div>
    <in v-model='mel' :placeholder="mel" >mel</in>
    <in v-model='rythme' :placeholder="rythme">rythme</in>
    <in v-model='scale' :placeholder="scale">scale</in>
    <div>      
      <span>timber</span>
      <select v-model="timber" name="" id="" @change="setTimber">
        <option v-for="n in ['AMSynth', 'FMSynth', 'DuoSynth','PluckSynth', 'MembraneSynth', 'MetalSynth']" :value="n" >{{n}}</option>
      </select>
    </div>
    <div>      
      <span>gain</span>
      <input type="range" min="-40" max="10" steps="1" v-model="volume" @input="setGain"></range>
    </div>
    <button ref="but" @click="generate" v-text="state" :style='style'></button>
  </div>
</template>

<script>

import Tone from 'tone'
import store from '@/stores/mel'
import input from './input.vue'
import {createMel, setComputed, playNote} from './doMel'

export default {
  props: ['ns'],
  components: {in: input},
  created () {
    this.$store.registerModule(['mels', this.ns], store)
    this.create()
  },
  data () {
    return {
      timber: 'AMSynth',
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
      this.setTimber()
      this.sequence = new Tone.Sequence((t, v) => {
        if (v === ',') { return }
        // console.log(this.sequence.subdivision)
        if (isNaN(parseInt(v))) {
          // means chord
          var chord = [0, 2, 4].map((vv) => {
            var freq = vv + 'c,d,e,f,g,a,b'.split(',').indexOf(v)
            return playNote.bind(this)(freq)
          })
          console.log(chord)
          this.sound.triggerAttackRelease(chord, this.sequence.subdivision)
        } else {
          // console.log('single note')
          var freq = playNote.bind(this)(v)
          if (!isNaN(freq)) {
            this.sound.triggerAttackRelease(freq, this.sequence.subdivision)
          }
        }
      }, [this.mel.split(',')], '4n')
      this.sequence.loop = true
    },
    kill () {
      this.stop()
      this.$emit('kill', this.ns)
    },
    setTimber () {
      // kill old one ?
      this.sound = new Tone[this.timber]().toMaster()
      // this.sound = new Tone.PolySynth(4, Tone[this.timber]).toMaster()
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
    play () {
      if (Tone.Transport.state === 'stopped') {
        Tone.Transport.start()
        this.sequence.start()
      } else {
        this.sequence.start('@1m')
      }
      this.active = true
    },
    generate () {
      if (this.sequence.state === 'started') {
        this.stop()
      } else {
        this.play()
      }
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
