<template lang="pug">
  svg(width=400 height=200)
    circle(cx=100 cy=100 r="50")    
    circle(cx=300 cy=100 r="50")    
  
</template>

<script>

export default {
    methods: {
	on (index) {
	    this.$el.children[index].style.fill = 'red'
	    setTimeout(() => {
		this.$el.children[index].style.fill = 'blue'
	    }, 100)
	},
	off (index) {
	    this.$el.children[index].style.fill = 'blue'
	}
    },
    created () {
	this.$on('io', () => {
	    console.log('78')
	})
    }
}
</script>

<style lang="sass">

svg
  fill: blue
  background: grey


</style>
