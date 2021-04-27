import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'utils/axios';
import store from '@/store'
import './assets/css/icon.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(router).use(ElementPlus).use(store)
app.config.globalProperties.$http=axios;
app.mount('#app')