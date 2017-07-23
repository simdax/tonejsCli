export function rotate (array, n) {
  var dep = array
  var res = []
  for (var i = 0; i < dep.length; i++) {
    res.push(dep[(i + n) % dep.length])
  }
  return res
}

function distance (v) {
  return v < 0 ? (v + 7) : v
}

function getIntervals (mel) {
  var res = []
  for (var i = 0; i < mel.length - 1; i++) {
    var tmp = mel[i + 1] - mel[i]
    res.push(distance(tmp))
  }
  return res
}

// have to be same length
export function merge (array, array2) {
  var res = Array(array.length)
  for (var i = 0; i < array.length; i++) {
    res[i] = array[i] + array2[i]
  }
  return res
}

export function addArray (array, val) {
  // console.log((array + val) % 7)
  return array.map(v => { return (v + val) % 7 })
}

const rules = [
  [0, 0, 0],
  [1, 1, 1],
  [-1, 0, 0],
  [0, 1, 1],
  [-1, -1, 0],
  [0, 0, 1],
  [-1, -1, -1]
]
const renversements = [0, 0, 2, 2, 1, 1, 0]

export function createChords (roots) {
  var r = roots.split('').map(v => parseInt(v))
  var intervals = getIntervals(r)
  var renversement = 0
  var res = [[0, 0, 0]]
  for (var i = 0; i < intervals.length; i++) {
    var basse = intervals[i]
    var motion = rules[basse]
    res.push(rotate(motion, renversement))
    renversement = (renversement + renversements[basse])
  }
  return res
}
