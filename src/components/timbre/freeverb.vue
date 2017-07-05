<template>

	<div>
		<h1> salut mec !</h1>
		<div v-for="n,k in options" :key="k">
			<p>{{k}}</p>
			<input v-model="options[k]" @keydown.13="set(k)">		
		</div>
	</div>
	
</template>

<style>		


</style>

<script>

	import Tone from 'tone'
	import options from './freeverb.json'

	export default{
		data () {
			return {
				options: options
			}
		},
		created () {
			// kill ??
			this.create()
			this.$emit('load')
		},
		methods: {
			create () {
				this.filter = new Tone.Freeverb().toMaster()
			},
			set (k) {
				console.log(k, this.options[k])
				if (k === 'partials') { this.options[k] = this.options[k].split(',') }
				this.filter[k].value = this.options[k]
			}
		}
	}
</script>
