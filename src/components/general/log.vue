<template>
	<div @click='show = !show'>
		<div id="fleche"> coucou </div>
		<slot v-if='show'></slot>
	</div>
</template>

<script>
export default {

  name: 'log',

  data () {
    return {
    	show: false
    }
  }
}
</script>

<style lang="scss" scoped>
	div {
		font-size: 0.73em;
		width: 30vw;
		position: fixed;
		top: 0;
		right: 0;
		padding: 3px;
		border-radius: 1px solid red;
		background-color: hsl(120deg, 40%, 80%);
	}
</style>
