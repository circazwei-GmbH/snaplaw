import en from "./en";
import de from "./de";
import {useAppSelector} from "../store/hooks";
import {LANGUAGE_ENGLISH} from "../store/modules/profile/constants";

const translate = (key: string, config: any) => {
    const splitedKey = key.split('.')
    let currentText = config
    for (let i = 0; i < splitedKey.length; i++) {
        currentText = currentText[splitedKey[i]];
    }

    return currentText
}

export function useI18n() {
    const currentLanguage = useAppSelector(state => state.profile.language)
    const t = (key: string) => translate(key, currentLanguage === LANGUAGE_ENGLISH ? en : de)
    return {t}
}