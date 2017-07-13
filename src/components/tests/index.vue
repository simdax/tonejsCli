<template>
<div>
	<tempo></tempo>
	<instruments></instruments>
	<generator></generator>
</div>
</template>

<script>

import tempo from '#/main/index'
import instruments from '#/instruments/index'
import generator from '#/mel/index'

var components = {tempo, instruments, generator}

export default {
	components
}
</script>

<style lang="css" scoped>
</style>
