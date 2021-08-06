import React from 'react';
import {View} from "react-native";
import TopBar from '../layouts/TopBar'
import DefaultSwitch from "../basics/switches/DefaultSwitch";
import { t } from 'i18n-js'

export default function ChangeLanguage() {

    return (
        <TopBar pageName={t('change_language.title')}>
            <View>
                <DefaultSwitch
                    title={t('change_language.languages.english')}
                    onChange={() => {}}
                />
                <DefaultSwitch
                    title={t('change_language.languages.germany')}
                    onChange={() => {}}
                />
            </View>
        </TopBar>
    )
}