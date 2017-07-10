export default function (dependencies) {
 var deps = dependencies.split(',')
	var res = {}
	// var names = []
	for (var i = 0; i < deps.length; i++) {
		!(function (i) {
				var tmp
				console.log(deps[i].slice(0, 3))
				if (deps[i].slice(0, 3) === '@') {
				// 	// very strange bug
					// console.log(deps[i], deps[i] === '../container/index')
					tmp = require(deps[i])
				} else {
					tmp = require('./' + deps[i])
				}
				res[deps[i]] = tmp
			}(i))
	}
	return res
}
