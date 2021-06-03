import { applyMiddleware, combineReducers, createStore } from "redux";
// middleWareSaga
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";
import ModalReducer from "./reducers/ModalReducer";
import TaskListReducer from "./reducers/TaskListReducer";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    TaskListReducer,
    LoadingReducer,
    ModalReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
