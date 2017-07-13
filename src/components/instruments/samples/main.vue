<template>

	<main>
		<h1 @click='deploy = !deploy'>instrument</h1>
		<transition 
			mode='in-out'
			enter-active-class = ""
			leave-active-class = ""
		>		
			<ul v-if='deploy' class="list up">
				<li @click='current += 5' class="fleches">previous</li>
				<li 
					v-for='(bool, url, k) in db' @click='$emit("input",url); deploy = !deploy'
					v-if ='current < k && k < limit'
				> 
					{{url.split('/')[3].replace('.wav', '')}}
				</li>
				<li @click='current += 5' class="fleches">next</li>
			</ul>
		</transition>
	</main>

</template>

<style scoped lang="scss">
	.up{
		z-index: 10;
	}
	.down{
		z-index: 0;
	}
	main{
		width: 20%;
		color: #332;
		text-align: center;
		position: relative;
		*{
			margin: 0
		}
	}
	.fleches {
		background: green
	}
	ul{
		padding: 0;
		position: absolute;
		background: linear-gradient(180deg,
		 hsl(20deg, 35%, 60%),
		 blue);
		list-style-type: none
	}
	h1{
		border-radius: 10px 10px 0 0; 
		font-family: 'Kurale', serif;
		background-color: hsl(20deg, 35%, 60%);
	}
	li{
		text-align: center;
		padding: 0 10px;
		cursor: pointer;
	}
	li:hover{
		background-color: tomato
	}
</style>

<script>

// import fonts from 'google-fonts'
import Search from './samples'
import db from './database'
// import {forEach} from 'lodash'

// console.log(fonts)

export default {
  name: 'samples',
  computed: {
  	limit () {
	  	return this.current + 5
  	}
  },
  data () {
    return {
    	current: 0,
    	deploy: false,
    	searcher: new Search(),
    	db: db,
    	root: 'http://freewavesamples.com/midi-instruments',
    	el: 'a',
    	attr: 'href',
    	regex: /instrument[^s]/
    }
  },
  created () {
		// global.s = this.searcher
  // 	this.searcher.mainRoot = this.root
  // 	this.searcher.l = (val) => {
  // 		this.l.splice(0)
  // 		for (var k in val) {
  // 			if (val[k]) {
  // 				this.l.push(k)
  // 			}
  // 		}
  // 	}
  // 	this.searcher.search(this.el, this.attr, this.regex)
  }
}
</script>

<style lang="css" scoped>
</style>
