import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
/* eslint-disable no-new */

Vue.use(VueRouter)
// Vue.http.options.emulateJSON = true
var router = new VueRouter()

// import Header from './components/GlobleHeader'
import QuestionList from './components/QuestionList'
import Index from './views/Index'
import Login from './views/Login'
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
  }
  // '/search/time/:time': {
  //   component: browseMode,
  //   subRoutes: {
  //     '/': {
  //       component: blogList
  //     }
  //   }
  // },
  // '/search/title/:title': {
  //   component: browseMode,
  //   subRoutes: {
  //     '/': {
  //       component: blogList
  //     }
  //   }
  // },
})
router.start(App, 'app')
