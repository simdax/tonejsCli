<template>

	<div>
    <button @click='addTimbre'> add new timbre</button>
    <div v-for="timbre in timbres">
      {{timbre.synth}}
      <button @click='delTimbre(timbre.hash)'> del timbre</button>
      <input @change="setTimbre({hash: timbre.hash, val:$event.target.value})">
    </div>
	</div>

</template>

<script>
	import {mapGetters as get, mapActions as actions} from 'vuex'
  export default {
    name: 'tonejsStore',
    computed: get(['timbres']),
    methods: {
      ...actions(['addTimbre', 'delTimbre']),
      ...actions('timbres', ['setTimbre'])
    },
    data () {
      return {}
    }
  }
</script>

<style lang="css" scoped>
</style>
