import Vue from 'vue'
import Router from 'vue-router'

import App from '#/main/index'
import tests from '#/tests/index.vue'
import timbre from '#/timbre/main'
import filter from '#/timbre/freeverb'
import harmonisation from '#/harmonisation/main'
import instruments from '#/instruments/index'
import stat from '#/stats/main'

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
      path: '/instruments',
      component: instruments
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
