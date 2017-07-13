<template>
<div>
	<p>{{transport.state}}</p>
</div>
</template>

<script>

import Tone from 'tone'

export default {

  name: 'transport',
  watch: {
  	'transport.state': {
  		deep: true,
  		handler (a, b, c, d) {
  			// console.log(a, b, c, d)
  		}
  	}
  },
  data () {
    return {
    	transport: Tone.Transport
    }
  }
}
</script>

<style lang="css" scoped>
</style>
