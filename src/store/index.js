import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    selected: null,
    question: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUsers (state, users) {
      state.users = users
    },
    setSelected (state, selected) {
      state.selected = selected
    },
    setQuestion (state, question) {
      state.question = question
    },
    reset (state) {
      state.user = null
      state.users = []
      state.selected = null
      state.question = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
