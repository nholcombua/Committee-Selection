import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import eventBus from './eventBus/eventBus'; 

loadFonts();

const app = createApp(App);

// Make the event bus available globally in your Vue app
app.config.globalProperties.$bus = eventBus;
app.use(router).use(vuetify).mount('#app');



