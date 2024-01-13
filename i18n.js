import { createI18n } from 'vue-i18n'

// Import JSON files
import en from './locales/en.json';
import ar from './locales/ar.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ar
  }
});