import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import as from './as.json';
import hi from './hi.json';

const resources = {
  en: { translation: en },
  as: { translation: as },
  hi: { translation: hi },
};

const initI18n = async () => {
  // 1. Check if user manually saved a language preference before
  let savedLanguage = await AsyncStorage.getItem('user-language');

  // 2. If not, fallback to device language. Extract 'as', 'en', or 'hi'
  if (!savedLanguage) {
    const deviceLang = Localization.getLocales()[0].languageCode;
    savedLanguage = resources[deviceLang as keyof typeof resources] ? deviceLang : 'en';
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'en', // If an Assamese word is missing, show English, don't crash.
      interpolation: {
        escapeValue: false, // React already safes from XSS
      },
      cleanCode: true,
    });
};

initI18n();

export default i18n;