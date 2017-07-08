<template>
	<div>
		<div id="fleche" @click="toggled =! toggled"> || </div>	
		<transition
		 enter-active-class="animated slideInUp "
		 leave-active-class="animated slideOutDown"
		 >
			<div v-show='toggled'>
				<!-- <keep-alive>					 -->
					<slot></slot>
				<!-- </keep-alive> -->
			</div>
		</transition>
	</div>
</template>

<script>
export default {
  name: 'partition',
  data () {
    return {
    	toggled: false
    }
  }
}
</script>

<style lang="css" scoped>
	#fleche{
		background-color: grey;
		padding: 5px;
	}
</style>
