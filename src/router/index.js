import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import tests from '@/components/tests/index.vue'
import timbre from '@/components/timbre/main'
import filter from '@/components/timbre/freeverb'
import harmonisation from '@/components/harmonisation/main'
import samples from '@/components/samples/main.vue'
import stat from '@/components/stats/main.vue'
import routerStats from '../components/stats/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tests',
      component: tests
    },
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
      path: '/samples',
      name: 'samples',
      component: samples
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
      component: stat,
      children: [routerStats]
    },
    {
      path: '*',
      component: { template: `<div>OH NOOOOON !!!</div>` }
    }
  ]
})
