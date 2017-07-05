<template>
	<div>		
		<generator
		 v-for="i in components" :ns='String(i)' :key='i'
		 @kill="kill($event)"
		></generator>
	</div>
</template>

<script>
	import generator from './components/generator.vue'
	export default {
		components: {generator},
		data () {
			return {
				// list of namespaces for components
				components: [0]
			}
		},
		methods: {
			add () {
				this.components.push(this.components.length)
			},
			kill (e) {
				this.components.splice(e, 1)
				this.$children[e].stop()
			}
		}
	}
</script>
