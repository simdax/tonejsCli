<template>
	<div>
		<label for="">
			{{ titre }}
			<input type="checkbox" @update='$emit("update",$event.target.value)'>
		</label>
	</div>
</template>

<style>

</style>

<script>
	export default {
		props: ['value', 'titre']
	}
</script>
