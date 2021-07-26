import {configureStore, applyMiddleware, createStore, combineReducers} from '@reduxjs/toolkit'
import auth from './modules/auth/slice'
import createSagaMiddleware from 'redux-saga'
import authSaga from './modules/auth/saga'

const sagaAuthMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({thunk: false}), sagaAuthMiddleware]
})

sagaAuthMiddleware.run(authSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store