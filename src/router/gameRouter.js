import imitation from '@/components/game/imitation'
import rythme from '@/components/game/rythme'

var main = {
	template: `
		<router-view></router-view>
	`
}

export default {
	path: '/game',
	component: main,
	children: [
		{
			path: 'test',
			component: imitation
		},
		{
			path: 'rythme',
			component: rythme
		}
	]
}

