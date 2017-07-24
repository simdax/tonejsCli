<template>

  <div class="main">
    <div>
      <button>{{state}}</button>
      <ronds ref="ronds"></ronds>
    </div>
    <mels :mels="record.mels"></mels>
  </div>

</template>

<script>  

import keys from './keys'
import TimedMel from '@/lib/TimedMel'
import Player from '@/lib/Play'
import melAbsDur from '@/lib/melAbsDur'
import ronds from './ronds.vue'
import mels from './mels.vue'

var player = new melAbsDur()

export default {
    components: {ronds, mels},
    name: 'imitation',
    computed: {
	state () {
	    return "listening"
	}
    },
    data () {
	return {
	    record: new TimedMel(),
	}
    },
    mounted () {
	this.create()
    },
    beforeDestroy () {
	this.destroy()
    },
    methods: {
	create () {
	    window.addEventListener('keydown', this.keys)
	},
	destroy () {
	    window.removeEventListener('keydown', this.keys)
	},
  	keys
    }
  }
  
</script>

<style scoped lang="sass">
  .main
    display: grid
    grid-template: 1fr 1fr / 1fr 1fr
    .tmpMel
      padding: 15px
      display: flex

    </style>
