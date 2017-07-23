import Tone from 'tone'
import {_, times, random as randomVal} from 'lodash'

function Play (root = 60) {
  this.synth = new Tone.Synth().toMaster()
  this.accSynth = new Tone.PolySynth(3).toMaster()
  this.root = root
  this.seq = new Tone.Sequence((t, v) => {
    console.log(v)
    this.note(v)
  }, [0], '16n')
  this.seq.loop = false
  Tone.Transport.start()
}
// static
Play.scale = [0, 2, 4, 5, 7, 9, 11, 12]

Play.prototype = {
  mod (val, mod) {
    return ((val % mod) + mod) % mod
  },
  toDegree (v) {
    var sign = Math.sign(v)
    v = Math.abs(v)
    var octave = Math.floor(v / 7)
    var index = v % (Play.scale.length - 1)
    var degree = sign * (Play.scale[index] + octave * 12)
    return new Tone.Frequency(this.root + degree, 'midi').toNote()
    // return 0g
  },
  note (note) {
    this.synth.triggerAttackRelease(this.toDegree(note), 1)
  },
  acc (note) {
    var freq = this.toDegree(note)
    var accord = Tone.Frequency(freq).harmonize([0, 4, 7]).valueOf()
    this.accSynth.triggerAttackRelease(accord, 1)
  },
  check (mel) {
    return mel
  },
  random (dur = 8, lo = -1, hi = 1) {
    var randomArray = times(dur, randomVal.bind(_, lo, hi, false))
    this.mel(randomArray)
  },
  setMel (array) {
    this.seq.removeAll()
    for (var i = 0; i < array.length; i++) {
      this.seq.add(i, array[i])
    }
  },
  play (array) {
    // var mel = this.check(array)
    this.seq.start('0:0:0')
  }
  // melAcc (array) {
  //   var seq = new Tone.Sequence((t, v) => {
  //     this.acc(v)
  //     this.note(v)
  //   }, array)
  //   seq.loop = false
  //   seq.start()
  // }
}

// export scale
export default Play
