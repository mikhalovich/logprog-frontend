import { createApp } from 'vue';
import './assets/styles/style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import router from './router';

createApp(App).use(router).use(createPinia()).use(ElementPlus).mount('#app');
