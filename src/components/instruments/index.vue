<template>
	<div>
    <button @click='addTimbre'> add new timbre</button>
    <div v-for="timbre in timbres">
      {{timbre.timbre}}
      <samples class="samples" @input='setTimbre({hash: timbre.hash, val: $event})'/>
      <button @click='delTimbre(timbre.hash)'> del timbre</button>
    </div>
	</div>
</template>

<style>
  .samples{
    display: inline-block;
    color: red;
    width: 50%;
  }
</style>

<script>
	import {mapGetters as get, mapActions as actions} from 'vuex'
  import samples from '@/components/samples/main.vue'
  export default {
    components: {samples},
    name: 'tonejsStore',
    computed: {
      ...get(['timbres'])
    },
    methods: {
      ...actions(['addTimbre', 'delTimbre']),
      ...actions('timbres', ['setTimbre'])
    },
    data () {
      return {}
    }
  }
</script>
