import 'intl-pluralrules';
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en";
import ru from "./ru";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: true,
      fallbackLng: "en",
      resources: {
        en: {
          translation: en
        },
        ru: {
          translation: ru
        }
      }
    });

export default i18next;
