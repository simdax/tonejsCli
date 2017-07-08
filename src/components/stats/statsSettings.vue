<template>
	<div>
		<label>
			{{ titre }}
			<input type="checkbox" @change='$emit("input", $event.target.checked)'>
		</label>
	</div>
</template>

<style>

</style>

<script>
	export default {
		props: ['titre']
	}
</script>
