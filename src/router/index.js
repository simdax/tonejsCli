import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import timbre from '@/components/timbre/main'
import filter from '@/components/timbre/freeverb'

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
    }
  ]
})
