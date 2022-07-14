import { createStore } from 'vuex'

export default createStore({
  state: {
    apiKeyId: '',
    apiKey: '',
    errorMessage: ''
  },
  mutations: {
    setApiKeyId (state, value) {
      state.apiKeyId = value
    },
    setApiKey (state, value) {
      state.apiKey = value
    },
    initError (state, value) {
      state.errorMessage = value
    }
  }
})

