export function capitalizeString (string) {
	var mots = string.split('-')
	// console.log(mots)
	if (mots[0] === 'sample') {
	 	return false
	} else {
		mots = mots.map(mot => {
			if (mot.length === 2 || mot.length === 3) {
				return mot.toUpperCase()
			} else if (mot.match(/\d+\w/)) {
				return mot.toUpperCase()
			} else {
		    return mot.charAt(0).toUpperCase() + mot.slice(1)
			}
		}).join('-')
		return mots
	}
}

export function urlExists (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.status < 400)
    }
  }
  xhr.open('HEAD', url)
  xhr.send()
}
