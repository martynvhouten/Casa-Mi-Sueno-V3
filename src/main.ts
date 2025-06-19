import { createApp } from 'vue';
import { Quasar, Dialog, Notify, Loading } from 'quasar';
import { setupCalendar } from 'v-calendar';
import quasarIconSet from 'quasar/icon-set/material-icons-outlined';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass';
import 'quasar/dist/quasar.css';
import './styles/quasar-variables.sass';

// Import v-calendar styles
import 'v-calendar/style.css';

// Import app css
import './css/app.css';

import App from './App.vue';
import router from './router';
import i18n from './i18n';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
    Loading
  },
  iconSet: quasarIconSet,
  config: {
    brand: {
      primary: '#D17A52',
      secondary: '#F5EDE7',
      accent: '#D17A52',
      dark: '#1D1D1D'
    }
  }
});

app.use(router);
app.use(i18n);
app.use(setupCalendar, {});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered:', registration);
    }).catch(error => {
      console.log('SW registration failed:', error);
    });
  });
}

app.mount('#app'); 