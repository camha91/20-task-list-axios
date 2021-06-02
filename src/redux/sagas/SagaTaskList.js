import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskListService } from "../../services/taskListService";
import { GET_TASK_API } from "../constant/TaskListContant";

function* getTaskApiAction(action) {
    yield put({
        type: "DISPLAY_LOADING",
    });

    yield delay(800);

    const { data, status } = yield call(taskListService.getTaskApi);

    // After get data successfully, use put (similar to dispatch in redux-thunk)
    yield put({
        type: GET_TASK_API,
        taskList: data,
    });

    yield put({
        type: "HIDE_LOADING",
    });
}

export function* followActionGetTaskApi() {
    yield takeLatest("getTaskApiAction", getTaskApiAction);
}
