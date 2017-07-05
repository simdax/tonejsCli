<template>
  <input @input='$emit("input", $event.target.value)'/>
</template>

<script>
	export default {	}
</script>
