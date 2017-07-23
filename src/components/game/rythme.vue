
<template>

  <div>
    <h1>gros rythme de ouf</h1>
    {{rythme[rythme.length - 1]}}
    rythme
    {{mel.rythmes}}
    <input type="number" v-for="(rythme,i) in mel.rythmes" v-model.number="mel.rythmes[i]"/>
    <!-- {{mel.notes}} -->
<!-- <input type="number" v-for="(note,i) in mel.notes" v-model.number="mel.notes[i]">{{note}}</option> -->
<button @click = "mel.play()">play</button>
  </div>
</template>

<script>

import Tone from 'tone'
import Melody from '@/lib/Melody'

export default {
    data () {
	return {
	    mel: new Melody()
	}
    },
    computed: {
    },
    mounted () {
	this.create()
	Tone.Transport.on('loop', (a, b) => {
	    // console.log(a, b, 'loop')
	    // refresh sumfine
	})
    },
    beforeDestroy () {
	this.destroy()
	Tone.Transport.off('loop')
    },
    methods: {
	keys () {
	    this.rythme.push(Tone.Transport.position)
	},
	create () {
	    window.addEventListener('keydown', this.keys)
	},
	destroy () {
	    window.removeEventListener('keydown', this.keys)
	}
    }
}

      </script>
