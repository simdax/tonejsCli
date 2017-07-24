import Tone from 'tone'

class MelAbsDur {

  constructor () {
    this.synth = new Tone.Synth().toMaster()
  }

  calcTime (t) {
    return Tone.now() + this.synth.blockTime + t
  }
  calcPoints () {
    var durPoints = [0, this.durs[0]]
    this.durs.reduce((a, b) => {
      durPoints.push(a + b); return (a + b)
    })
    durPoints.splice(-1, 1)
    return durPoints.map(t => this.calcTime(t))
  }

  callback () {
    var durPoints = this.calcPoints()
    for(var i = 0; i < durPoints.length; i++) {
      var release = durPoints[i]
      var dur = this.durs[i]
      var note = this.notes[i % this.notes.length]
      console.log(note, dur, release)
      this.synth.triggerAttackRelease(note, dur, release)
    }
  }

  play (offset) {
    if(!this.durs) {throw("pas de durs !")}
    if(!this.notes) {throw("pas de notes !")}
    // this.callback()
    Tone.Transport.schedule(this.callback.bind(this), offset)
  }

}

export default MelAbsDur



