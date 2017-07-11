<template>
	<div id="generator">	
		<button @click="add()">add</button>	
		<generator
			ref="children"
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
	import generator from './mel'
	export default {
		components: {generator},
		data () {
			return {
				last: 0,
				components: [0]
			}
		},
		methods: {
			add () {
				// little trick for FIFO managment
				var i = this.last = this.components[this.components.length - 1] || this.last
				// console.log(i)
				this.components.push(i + 1)
			},
			kill (e) {
				this.$store.unregisterModule(['mels', String(e)])
				// console.log(this.$store)
				var child = this.$refs.children.find(v => { return v.ns === e })
				this.components.splice(this.$refs.children.indexOf(child), 1)
				console.log('prout')
			}
		}
	}
</script>
