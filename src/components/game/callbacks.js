import Play from '@/lib/Play'

var play = new Play()

export default {
	'q' () {
		play.acc(0)
	},
	's' () {
		play.acc(1)
	}
}
