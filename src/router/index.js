import Vue from 'vue'
import Router from 'vue-router'
import Jsplumb from '@/components/jsplumb-demo01'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Jsplumb',
      component: Jsplumb
    }
  ]
})
