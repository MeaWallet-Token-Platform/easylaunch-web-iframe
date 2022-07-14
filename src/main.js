import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'

createApp(App).use(store).use(Vuex).use(VueAxios).use(router).mount('#app')
