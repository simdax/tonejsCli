import imitation from '@/components/game/imitation/index'
import rythme from '@/components/game/rythme/index'

var main = {
  template: `
          <div>
        <router-link v-for="name in names" :key="name" :to="{name}"> {{name}} </router-link>
        <router-view></router-view>
    </div>
    `,
  data () {
    return {
      names: 'imitation,rythme'.split(',')
    }
  }
}

export default {
  path: '/game',
  component: main,
  children: [
    {
      path: 'imitation',
      component: imitation,
      name: 'imitation'
    },
    {
      path: 'rythme',
      component: rythme,
      name: 'rythme'
    }
  ]
}

