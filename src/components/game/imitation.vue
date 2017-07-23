<template>

  <div>
    salut petite pute
    {{mels}}
  </div>

</template>

<script>

import keys from './keys'
import TimedMel from '@/lib/TimedMel'

export default {

    name: 'imitation',
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
    },
    data () {
	return {
	    mels: new TimedMel()
	}
    }
}
  </script>

<style lang="css" scoped>
</style>
