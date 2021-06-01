import { applyMiddleware, combineReducers, createStore } from "redux";
import TaskListReducer from "./reducers/TaskListReducer";
import reduxThunk from "redux-thunk";

// middleWareSaga
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    TaskListReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
