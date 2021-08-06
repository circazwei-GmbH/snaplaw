import React from 'react';
import {View} from "react-native";
import TopBar from '../layouts/TopBar'
import DefaultSwitch from "../basics/switches/DefaultSwitch";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {LANGUAGE_ENGLISH, LANGUAGE_GERMANY} from "../../store/modules/profile/constants";
import {LanguageType, setLanguage} from "../../store/modules/profile/slice";
import {useI18n} from "../../translator/i18n";
import * as profileACs from '../../store/modules/profile/action-creators'

export default function ChangeLanguage() {
    const dispatch = useAppDispatch();
    const currentLanguage = useAppSelector(state => state.profile.language)
    const {t} = useI18n()
    const changeLanguageHandler = (selectedLanguage: LanguageType) => {
        dispatch(setLanguage(selectedLanguage))
        dispatch(profileACs.setLanguage(selectedLanguage))
    }

    return (
        <TopBar pageName={t('change_language.title')}>
            <View>
                <DefaultSwitch
                    title={t('change_language.languages.english')}
                    onChange={() => changeLanguageHandler(LANGUAGE_ENGLISH)}
                    value={currentLanguage === LANGUAGE_ENGLISH}
                />
                <DefaultSwitch
                    title={t('change_language.languages.germany')}
                    onChange={() => changeLanguageHandler(LANGUAGE_GERMANY)}
                    value={currentLanguage === LANGUAGE_GERMANY}
                />
            </View>
        </TopBar>
    )
}