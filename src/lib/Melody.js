import Rhythm from './Rhythm'
import Play from './Play'

function Melody () {
  this.player = new Play()
  this.events = new Rhythm()
  var rythmes = [3, 2, 3, 3]
  var notes = [0, 1, 2, 1]
  Object.defineProperty(this, 'notes', {
    get () {
      return notes
    },
    set (val) {
      notes = val
      this._update()
    }
  })
  Object.defineProperty(this, 'rythmes', {
    get () {
      return rythmes
    },
    set (val) {
console.log('up')
      rythmes = val
      this._update()
    }
  })
}

Melody.prototype = {
  play () {
    this._update()
    this.player.play()
  },
  _update () {
    var b = this.events.setByGroups(this.rythmes, this.notes)
    this.player.setMel(b)
  }
}

export default Melody
