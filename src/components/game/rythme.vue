
<template>

  <div>
    <h1>gros rythme de ouf</h1>
    {{rythme}}    
  </div>
</template>

<script>

import Tone from 'tone'

export default {
    mounted () {
	this.create()
    },
    methods: {
	keys () {
	    console.log(Tone.Transport.position)
	},
	create () {
	    window.addEventListener('keydown', this.keys)
	},
	destroy () {
	    window.removeEventListener('keydown', this.key)
	}
	},
	data () {
	    return {
		rythme: ''
	    }
	}
    }

  </script>
