
<template>
  <div>
    <div v-for="mel,i in mels">
      {{mel}}
      <button @click="mels.splice(i-1,1)">del</button>
      <button @click="play(i)">play</button>
    </div>
  </div>

</template>

<script>

import melAbsDur from '@/lib/melAbsDur'
var player = new melAbsDur()

export default {
    props: ['mels'],
    methods: {
	stop (index) {
	    
	},
	play (index) {
	    var mel = this.mels[index]
	    var notes = mel.notes.split('')
	    var durs = mel.times
	    player.notes = notes.map(v => (v === '+') ? 440 : 550)
	    player.durs = durs.map(v => parseFloat(v))
	    player.durs.push(1) // end note
	    player.play(mel.start)
	}
    }
}

</script>
