<template>
<div>
	<tonejsStore></tonejsStore>
</div>
</template>

<script>

import samples from '@/components/samples/main.vue'
var res = {}
var deps = `
@/components/container/index',
falseApp
`.split(',').map(v => { return v.trim() })

for (var i = 0; i < deps.length; i++) {
	!(function (i) {
			var tmp
			// very strange bug
			if (deps[i][0] === '@') {
				// console.log(deps[i], deps[i] === '../container/index')
				tmp = require('../container/index')
				res[deps[i].split('/')[2]] = tmp
			} else {
				tmp = require('./' + deps[i])
				res[deps[i]] = tmp
			}
		}(i))
}

export default {
	components: {...res, samples},
	computed: {
		instrument: {
			get (v) {
				//
			},
			set (v) {
				this.$store.dispatch('timbres/0/set', v)
			}
		}
	}
}
</script>

<style lang="css" scoped>
</style>
