import { createI18n } from 'vue-i18n';
import nl from './nl';

const i18n = createI18n({
  legacy: false,
  locale: 'nl',
  fallbackLocale: 'nl',
  messages: {
    nl
  }
});

export default i18n; 