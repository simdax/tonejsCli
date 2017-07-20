<template>

<div>
	salut petite pute
  <button @click="play"> play </button>
</div>

</template>

<script>

	import keys from './keys'
  import Play from '@/lib/Play'
  import random from './randomMel'
  let p = new Play()

export default {

  name: 'imitation',
  mounted () {
    this.create()
  },
  methods: {
    play () {
      var mel = random(3)
      console.log(mel)
      p.mel(mel)
    },
    create () {
      window.addEventListener('keydown', this.keys)
    },
    destroy () {
      window.removeEventListener('keydown', this.key)
    },
  	keys
	},
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
