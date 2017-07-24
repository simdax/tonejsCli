
<template>
  <main>
    <h1>gros rythme de ouf</h1>
    <bob>
      <p>rythme {{rythmes}} </p>
      <input type="number" v-for="(rythme,i) in rythmes" v-model.number="rythmes[i]"/>
      <p>note {{notes}} </p>
      <input type="number" v-for="(note,i) in notes" v-model.number="notes[i]"/>
    </bob>
    <button @click = "mel.play()">play</button>
    <p>coucou</p>
  </main>
</template>

<style lang="sass" scoped>

$bob: (h1, bob, button, p)

@each $part in $bob
  #{$part}
    grid-area: #{$part}
   
main
  display: grid
  border: 1px solid black
  grid-template: 1fr / 1fr 1fr
  grid-template-areas: "h1 h1" "bob bob"  "button p"

bob
  display: flex
  justify-content: center
h1
  text-align: center
</style>

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
	rythmes () {
	    return this.mel.rythmes
	},
	notes () {
	    return this.mel.notes
	}
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
	    this.rythmes.push(Tone.Transport.position)
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
