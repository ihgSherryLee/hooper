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
import TopicList from './views/TopicList'
import Topic from './views/Topic'
import Question from './views/Question'
import Search from './views/Search'
import User from './views/User'
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
  '/profile/:userId': {
    name: 'profile',
    component: Profile
  },
  '/topicList': {
    component: TopicList
  },
  '/topic/:topicId': {
    name: 'topic',
    component: Topic
  },
  '/question/:questionId': {
    name: 'question',
    component: Question
  },
  '/search/:type/:keyword': {
    name: 'search',
    component: Search
  },
  '/user/:userId': {
    name: 'user',
    component: User
  }
})
router.start(App, 'app')
