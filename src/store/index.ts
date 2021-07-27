import {configureStore} from '@reduxjs/toolkit'
import auth from './modules/auth/slice'
import main from './modules/main/slice'
import createSagaMiddleware from 'redux-saga'
import authSaga from './modules/auth/saga'

const sagaAuthMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth,
        main
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({thunk: false}), sagaAuthMiddleware]
})

sagaAuthMiddleware.run(authSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store