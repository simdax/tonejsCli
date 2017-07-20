<template>
<div>
  <button @click="go">
    {{transport.state}}
  </button>
    <button @click="transport.loopEnd -= parseInt(1)">-</button>
    {{transport.loopEnd}}
    <button @click="transport.loopEnd += parseInt(1)">+</button>
</div>
</template>

<script>

import Tone from 'tone'

export default {

name: 'transport',
created () {
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true
},
methods: {
    loop (e) {
	console.log(e)
    Tone.Transport.loopEnd
},
go () {
Tone.Transport.state === 'started' ? Tone.Transport.stop() : Tone.Transport.start()
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
