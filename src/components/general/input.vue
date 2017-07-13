<template>
	<div>
		<slot></slot>	
	  <input :placeholder="placeholder" @input='$emit("input", $event.target.value)'/>	
	</div>
</template>

<script>
	export default {
		props: ['placeholder']
	}
</script>
