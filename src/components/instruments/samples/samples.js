import {capitalizeString, urlExists} from './helpers'
import $ from 'jquery'

function Samples (root) {
	this.mainRoot = root
	this.globCount = 20
	this.list = {}
}
Samples.prototype.mainHook = function (v, count) {
	var href = $(v).attr('href')
	var capHref = capitalizeString(href.slice(1))
	if (capHref) {
		var url = 'http://freewavesamples.com/files/' + capHref + '.wav'
		urlExists(url, (exists) => {
			if (exists && count > 0) {
				console.log('mere')
				this.list[url] = true
				this.l(this.list)
			} else {
				this.list[url] = false
			}
		})
	}
}
Samples.prototype.search = function (el, attr, regex, root = this.mainRoot) {
	var count = this.globCount
	$.get(root, (response) => {
	// console.log(response)
	$(response)
	.find(el)
	.filter(function () {
		if (regex) {
			return regex.test($(this).attr(attr))
		} else {
			return true
		}
	})
	.each((i, v) => {
		if (root === this.mainRoot && count > 0) {
			this.search('.sample a', 'href', null, 'http://freewavesamples.com' + $(v).attr('href'))
		} else if (count > 0) {
			this.mainHook(v, count)
		} else {
			console.log('c est bon, on a de la value')
		}
	})
})
}

export default Samples
