import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
/* eslint-disable no-new */

Vue.use(VueRouter)
// Vue.http.options.emulateJSON = true
var router = new VueRouter()

import QuestionList from './components/QuestionList'
router.map({
  '/': {
    component: QuestionList
    // subRoutes: {
    //   '/': {
    //     component: QuestionList
    //   },
    //   '/details': {
    //     component: QuestionArticle
    //   }
    // }
  }
  // '/edit/:mode': {
  //   component: writePanel
  // },
  // '/search/tag/:tag': {
  //   component: browseMode,
  //   subRoutes: {
  //     '/': {
  //       component: blogList
  //     }
  //   }
  // },
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
