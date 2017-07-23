import Tone from 'tone'
// import {filter} from 'lodash'

class TimedMel {

  constructor () {
    this.id = -1
    this.releaseTime = '2n'
    this.mels = []
    this.now = []
  }

  transform () {
    var times = this.now.map(v => v.time)
    var notes = this.now.map(v => v.dir)
    this.mels.push({times, notes})
    this.now = []
  }

  callback () {
    this.transform()
    Tone.Transport.clear(this.id)
    this.id = -1
  }

  sched (to) {
    if (this.id !== -1) {
      Tone.Transport.clear(this.id)
    }
    this.id = Tone.Transport.schedule(this.callback.bind(this), to)
  }

  reschedule (time, key) {
    var timeTo = new Tone.Time(time).add(this.releaseTime).valueOf()
    // if loop
    var rest = timeTo - Tone.Transport.loopEnd
    if (rest > 0) {
      timeTo = rest
    }
    this.now.push({dir: key, time: Tone.Transport.progress})
    this.sched(timeTo)
  }

}

export default TimedMel
