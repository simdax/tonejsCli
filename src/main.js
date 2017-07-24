// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import store from './stores'
import navbar from './components/main/index'

import './main.css'

global.s = store

import Tone from 'tone'
global.Tone = Tone
import Mel from './lib/Melody'
global.Mel = Mel

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {navbar},
  template: `
    <div>
      <navbar></navbar>
       <div class="tabs">
      <div class="tabs" v-for="route in $router.options.routes">
          <router-link :to='route.path'>{{route.path}}</router-link>
      </div>
    </div>    
             <router-view></router-view>
    </div>
    `
})
