import {REQUEST_LANGUAGE, requestLanguage, SET_LANGUAGE, setLanguage} from "../action-creators";
import {LANGUAGE_ENGLISH} from "../constants";


describe('ProfileActionCreators', () => {
    it('setLanguage should return valid action', () => {
        const action = setLanguage(LANGUAGE_ENGLISH)
        expect(action).toHaveProperty('type', SET_LANGUAGE)
        expect(action).toHaveProperty('payload', LANGUAGE_ENGLISH)
    })
    it('requestLanguage should return valid action', () => {
        const action = requestLanguage()
        expect(action).toHaveProperty('type', REQUEST_LANGUAGE)
        expect(action).toHaveProperty('payload', undefined)
    })
})