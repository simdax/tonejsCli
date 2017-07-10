<template>
<div>
	<p> partition : {{isOk}} </p>
	<div v-for="i in notes">
		{{i}}
	</div>
</div>
</template>

<script>

	import {isEmpty} from 'lodash'
	import {mapGetters} from 'vuex'

	export default {
		computed: {
			...mapGetters(['midi']),
			notes () {
				var res = []
					if (this.midi.tracks) {
					for (var i = 0; i < this.midi.tracks.length; i++) {
						res.push([this.midi.tracks[i].name])
						for (var j = 0; j < this.midi.tracks[i].notes.length; j++) {
							res[i].push(this.midi.tracks[i].notes[j].name)
							res[i].push(this.midi.tracks[i].notes[j].time)
						}
					}
				}
				return res
			},
			isOk () {
				return !isEmpty(this.midi)
			}
		}
	}
	</script>

	<style lang="css" scoped>
	</style>
