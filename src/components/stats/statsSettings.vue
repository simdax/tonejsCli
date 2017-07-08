<template>
	<div>
		<label for="">
			{{ titre }}
			<input type="checkbox" @input='value=$event.target.value'>
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
