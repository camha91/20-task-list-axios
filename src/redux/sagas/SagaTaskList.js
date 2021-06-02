import { call, put, takeLatest } from "@redux-saga/core/effects";
import { taskListService } from "../../services/taskListService";
import { GET_TASK_API } from "../constant/TaskListContant";

function* getTaskApiAction(action) {
    console.log("action saga: ", action);
    const { data, status } = yield call(taskListService.getTaskApi);

    // After get data successfully, use put (similar to dispatch in redux-thunk)
    yield put({
        type: GET_TASK_API,
        taskList: data,
    });
}

export function* followActionGetTaskApi() {
    yield takeLatest("getTaskApiAction", getTaskApiAction);
}
