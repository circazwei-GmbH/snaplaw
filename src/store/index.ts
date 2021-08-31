import { configureStore } from "@reduxjs/toolkit";
import auth from "./modules/auth/slice";
import main from "./modules/main/slice";
import profile from "./modules/profile/slice";
import contract from "./modules/contract/slice";
import createSagaMiddleware from "redux-saga";
import authSaga from "./modules/auth/saga";
import profileSaga from "./modules/profile/saga";
import mediaSaga from "./modules/media/saga";
import contractSaga from "./modules/contract/saga";
import mainSaga from "./modules/main/saga";

const sagaAuthMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth,
    main,
    profile,
    contract,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaAuthMiddleware,
  ],
});

sagaAuthMiddleware.run(authSaga);
sagaAuthMiddleware.run(profileSaga);
sagaAuthMiddleware.run(mediaSaga);
sagaAuthMiddleware.run(contractSaga);
sagaAuthMiddleware.run(mainSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
