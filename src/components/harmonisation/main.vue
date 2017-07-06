<template>
	<div>
		<input v-model="code" type="text" @input="update">
		<!-- <div class="response" v-for='response in responses'>{{h}}</div> -->
		<div class="response" >{{harmomo}}</div>
		<svg>
			<g id="red"></g>
			<g id="blue"></g>
			<g id="green"></g>
		</svg>
	</div>
</template>

<style lang="scss">
	.response {
		border-radius: 20px;
		background-color: hsl(120deg, 40%, 80%);
		padding: 10px;
		margin: 10px;
	}
	svg{
		background-color: hsl(0deg, 10%, 50%)
	}
	circle{
		r: 5px;
	}
</style>

<script>

	import * as d3 from 'd3'
	import {findPath} from './utils'
	import {updateD3} from './d3'

	export default {
		data () {
			return {
				code: ''
			}
		},
		computed: {
			formattedCode () {
				return this.code.replace(/\s+/, ',').split(',')
			}
		},
		created () {
			this.harmo = []
			this.responses = ['', '', '']
			this.history = []
		},
		methods: {
			update () {
				this.drawMel(this.code, 'red')
				this.generate()
				var harmo1 = this.harmo.map(v => { return v ? v[0] : ' ' })
				var harmo2 = this.harmo.map(v => { return v ? v[1] : ' ' })
				this.drawMel(harmo1, 'blue')
				this.drawMel(harmo2, 'green')
				var all = [this.code, harmo1.join().replace(/,/g, ''), harmo2.join().replace(/,/g, '')]
				this.harmomo = findPath(all)
			},
			generate () {
				this.harmo = this.code.split('').map(v => {
					var val = parseInt(v) % 7
					if (!isNaN(val)) {
						return [val + 2, val - 2]
					}
				})
			},
			drawMel (data, color) {
				if (data.length > 0) {
					// d3 update pattern
					var svg = d3.select('svg g#' + color).selectAll('circle').data(data)
					svg.exit().remove()
					updateD3(svg, color)
					updateD3(svg.enter().append('circle'), color)
				} else {
						// nothing but seems some bug with d3.exit and empty data....
				}
			}
		}
	}
</script>
