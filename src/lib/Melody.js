import Rhythm from './Rhythm'
import Play from './Play'

class Melody {

    constructor () {
	this.player = new Play()
	this.events = new Rhythm()
	var handler = {
	    set: function(target, name, val) {
		console.log(val, target, name)
		if (!isNaN(parseInt(name))) {
		    target[parseInt(name)] = val
		    this._update()
		    return true
		} else { return true }
	    }.bind(this)
	};
	this.rythmes = new Proxy([2, 2], handler);
	this.notes = new Proxy([0], handler);
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
