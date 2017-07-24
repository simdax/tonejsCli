import Rhythm from './Rhythm'
import Play from './Play'

class Melody {

  constructor () {
    this.player = new Play()
    this.events = new Rhythm()
    var rythmes = [2, 2]
    var notes = [0]
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

  play () {
    this._update()
    this.player.play()
  }

  _update () {
    // if(!this.durs) {throw("pas de durs !")}
    // if(!this.notes) {throw("pas de notes !")}
    var b = this.events.setByGroups(this.rythmes, this.notes)
    this.player.setMel(b)
  }
}

export default Melody
