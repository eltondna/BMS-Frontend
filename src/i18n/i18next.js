import i18n from "i18next"
import { initReactI18next} from "react-i18next"
import { translationEn, translationZh } from "./translation"
i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en :{
            translation: translationEn
        },
        zh:{
            translation: translationZh
        }
    }
})