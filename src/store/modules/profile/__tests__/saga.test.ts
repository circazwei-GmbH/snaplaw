import profileSaga from "../saga";
import {SET_LANGUAGE, setLanguage} from "../action-creators";
import {LANGUAGE_ENGLISH} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('redux-saga/effects', () => ({
    takeLatest: (type: string, gen: GeneratorFunction) => ({type, gen}),
    call: (func: Function, ...args: any) => ({func, args})
}))

describe('Profile Saga', () => {
    const gen = profileSaga();
    it('setLanguage should work', () => {
        const getAction: {type: string, gen: GeneratorFunction} = gen.next().value
        expect(getAction).toHaveProperty('type', SET_LANGUAGE)

        const setLanguageGen = getAction.gen(setLanguage(LANGUAGE_ENGLISH))

        const asyncStorageCall = setLanguageGen.next().value
        expect(asyncStorageCall).toHaveProperty('func', AsyncStorage.setItem)
        expect(asyncStorageCall).toHaveProperty('args', ['lang', LANGUAGE_ENGLISH])


    })
})