// Redux has 2 types:
// Type 1: action => object
// Type 2: action => function (usually use to call api or call other functions)
import Axios from "axios";
import { call, fork, put, take } from "redux-saga/effects";
import { GET_TASK_API } from "../constant/TaskListContant";

function* getTaskApi() {
    const { data, status } = yield call(() => {
        return Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET",
        });
    });

    // After get data successfully, use put (similar to dispatch in redux-thunk)
    yield put({
        type: GET_TASK_API,
        taskList: data,
    });
}

export function* rootSaga() {
    yield fork(getTaskApi);
}
