import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import timbre from '@/components/timbre/main'

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
		}
  ]
})
