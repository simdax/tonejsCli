import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import timbre from '@/components/timbre/main'
import filter from '@/components/timbre/freeverb'
import harmonisation from '@/components/harmonisation/main'
import stat from '@/components/harmonisation/statistics.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: App
    },
    {
		  path: '/timbre',
		  name: 'testSon',
		  component: timbre
		},
    {
      path: '/filter',
      component: filter
    },
    {
      path: '/harmo',
      component: harmonisation
    },
    {
      path: '/stat',
      component: stat
    },
    {
      path: '*',
      component: { template: `<div>OH NOOOOON !!!</div>` }
    }
  ]
})
