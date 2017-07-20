import Tone from 'tone'

function Play () {
	this.synth = new Tone.Synth().toMaster()
	this.accSynth = new Tone.PolySynth(3).toMaster()
	Tone.Transport.start()
}
// static
Play.scale = [0, 2, 4]

Play.prototype = {
	toDegree (v) {
		var degree = Play.scale[v % Play.scale.length]
		return new Tone.Frequency(60 + degree, 'midi').toNote()
	},
	note (note) {
		this.synth.triggerAttackRelease(this.toDegree(note), 1)
	},
	acc (note) {
		var freq = this.toDegree(note)

		var accord = Tone.Frequency(freq).harmonize([0, 4, 7]).valueOf()
		this.accSynth.triggerAttackRelease(accord, 1)
	},
	mel (array) {
		var seq = new Tone.Sequence((t, v) => {
			this.note(v)
		}, array)
		seq.loop = false
		seq.start()
	},
	melAcc (array) {
		var seq = new Tone.Sequence((t, v) => {
			this.acc(v)
			this.note(v)
		}, array)
		seq.loop = false
		seq.start()
	}
}

// export scale
export default Play
