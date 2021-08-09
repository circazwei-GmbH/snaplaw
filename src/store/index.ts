import {configureStore} from '@reduxjs/toolkit'
import auth from './modules/auth/slice'
import main from './modules/main/slice'
import profile from './modules/profile/slice'
import createSagaMiddleware from 'redux-saga'
import authSaga from './modules/auth/saga'
import profileSaga from "./modules/profile/saga";

const sagaAuthMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth,
        main,
        profile
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({thunk: false}), sagaAuthMiddleware]
})

sagaAuthMiddleware.run(authSaga)
sagaAuthMiddleware.run(profileSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store