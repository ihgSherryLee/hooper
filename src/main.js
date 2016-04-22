import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
/* eslint-disable no-new */

Vue.use(VueRouter)
// Vue.http.options.emulateJSON = true
var router = new VueRouter({
  history: true
})

// import Header from './components/GlobleHeader'
import QuestionList from './components/QuestionList'
import Index from './views/Index'
import Login from './views/Login'
import Profile from './views/Profile'
router.map({
  '/login': {
    component: Login
  },
  '/index': {
    component: Index,
    subRoutes: {
      '/': {
        component: QuestionList
      }
    }
  },
  '/profile': {
    component: Profile,
    name: 'profile'
  }
})
router.start(App, 'app')
