import { createI18n } from 'vue-i18n'

// Import JSON files
import en from './locales/en.json';
import ar from './locales/ar.json';
import es from './locales/es.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  messages: {
    es,
    en,
    ar
  }
});