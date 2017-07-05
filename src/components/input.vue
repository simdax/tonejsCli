<template>
	<div>
		<slot></slot>	
	  <input @input='$emit("input", $event.target.value)'/>	
	</div>
</template>

<script>
	export default {
	}
</script>
