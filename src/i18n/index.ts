import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./en.json";
import as from "./as.json";
import hi from "./hi.json";

const resources = {
  en: { translation: en },
  as: { translation: as },
  hi: { translation: hi },
};

const initI18n = async () => {
  // 1. AsyncStorage returns 'string
  const savedLanguage = await AsyncStorage.getItem("user-language");

  // 2. Logic to pick the starting language
  let initialLng = "en";

  if (savedLanguage && resources.hasOwnProperty(savedLanguage)) {
    initialLng = savedLanguage;
  } else {
    const deviceLang = Localization.getLocales()[0].languageCode;
    if (deviceLang && resources.hasOwnProperty(deviceLang)) {
      initialLng = deviceLang;
    }
  }

  // 3. Setup strictly typed options
  const i18nOptions: InitOptions = {
    resources,
    lng: initialLng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },

    compatibilityJSON: "v4",
  };

  await i18n.use(initReactI18next).init(i18nOptions);
};

initI18n();

export default i18n;
