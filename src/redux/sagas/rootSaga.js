// Redux has 2 types:
// Type 1: action => object
// Type 2: action => function (usually use to call api or call other functions)
import { all } from "redux-saga/effects";
import * as SagaTaskList from "./SagaTaskList";

export function* rootSaga() {
    yield all([
        // Follow all action saga taskList
        SagaTaskList.followActionGetTaskApi(),
        SagaTaskList.followActionAddTaskApi(),
    ]);
}
