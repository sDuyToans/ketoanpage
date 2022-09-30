import { createStore,  applyMiddleware, compose } from "redux";

import logger from 'redux-logger';

import createSagaMiddleware from "@redux-saga/core";

import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    logger,
    sagaMiddleware
]

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)