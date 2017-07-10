<template>

	<main>
		<h1 @click='deploy = !deploy'>instrument</h1>
		<transition 
			mode='in-out'
			enter-active-class = 'animated fadeInDown'
			leave-active-class = 'animated fadeOutUp'
		>		
			<ul v-if='deploy' class="list">
			<li v-for='(func, url) in l' @click='$emit("input",url)'>
				{{url.split('/')[4].replace('.wav', '')}}
			</li>
		</ul>
		</transition>
	</main>

</template>

<style scoped lang="scss">

	main{
		color: #332;
		text-align: center;
		*{
			margin: 0
		}
	}
	ul{
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

// console.log(fonts)

export default {
  name: 'samples',
  data () {
    return {
    	deploy: false,
    	searcher: new Search(),
    	l: db,
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
