<template>
	<div id="generator">		
		<generator
		 v-for="i in components" :ns='String(i)' :key='i'
		 @kill="kill($event)"
		></generator>
	</div>
</template>

<style scoped>
	#generator{
		margin: 0 auto;
		width: 85%; 
		display: flex;
		flex-flow: row wrap;
	}
	#generator *{
		padding: 5px;
		margin: 5px;
	}
</style>

<script>
	import generator from './generator'
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
				// on incremente le dernier
				var i = this.components[this.components.length - 1]
				this.components.push(i + 1)
				// console.log(i + 1)
			},
			kill (e) {
				this.$store.unregisterModule(String(e))
				var child = this.$children.find(v => { console.log(v.ns, e); return v.ns === e })
				// console.log(child)
				// console.log(this.$store._modulesNamespaceMap)
				this.components.splice(this.$children.indexOf(child), 1)
			}
		}
	}
</script>
