import callbacks from './callbacks'

let check = (key) => {
    for (var k in callbacks) {
	var possiblecallbacks = k.split(',')
	for (var i = 0; i < possiblecallbacks.length; i++) {
	    var letter = possiblecallbacks[i]
	    if (key === letter) {
		return callbacks[k]
	    }
	}
    }
    // if nothing found, returns false
    return false
}

export default function (e) {
    let callback = check(e.key)
    if (callback) {
	callback.bind(this)()
    } else {
	console.log('rien pour ', e.key)
    }
}
