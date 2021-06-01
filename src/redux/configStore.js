import { applyMiddleware, combineReducers, createStore } from "redux";
import TaskListReducer from "./reducers/TaskListReducer";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
    TaskListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
