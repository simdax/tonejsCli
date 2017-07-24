import Tone from 'tone'
// import {filter} from 'lodash'

class TimedMel {

  constructor () {
    this.id = -1
    this.releaseTime = '2n'
    this.mels = []
    this.tmp = []
    this.startTime = 0
  }

  transform () {
    var t = []
    this.tmp.map(v => v.time).reduce((a, b) => {
      t.push((b - a).toPrecision(2)); return b
    })
    var notes = this.tmp.map(v => v.dir).join('')
    var dur = t.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b)
    })
    this.mels.push({dur, times: t, notes, start: this.startTime, stop: Tone.Transport.position})
    this.tmp = []
    this.startTime = 0
  }

  callback () {
    this.transform()
    Tone.Transport.clear(this.id)
    this.id = -1
  }

  sched (to) {
    if (this.id !== -1) {
      Tone.Transport.clear(this.id)
    } else {
      this.startTime = Tone.Transport.position
    }
    this.id = Tone.Transport.schedule(this.callback.bind(this), to)
  }

  reschedule (key) {
    var time = Tone.Transport.position
    var timeTo = new Tone.Time(time).add(this.releaseTime).valueOf()
    // if loop
    var rest = timeTo - Tone.Transport.loopEnd
    if (rest > 0) {
      timeTo = rest
    }
    this.tmp.push({dir: key, time: Tone.now()})
    this.sched(timeTo)
  }

}

export default TimedMel
