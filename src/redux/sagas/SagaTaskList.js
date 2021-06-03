import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskListService } from "../../services/taskListService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConstant";
import {
    ADD_TASK_SAGA_API,
    GET_TASK_API,
    GET_TASK_SAGA_API,
    REJECT_TASK_SAGA_API,
    COMPLETE_TASK_SAGA_API,
    DELETE_TASK_SAGA_API,
} from "../constant/TaskListContant";

/*
    06/02/2021 Camha wrote function getTaskApiAction
*/
function* getTaskApiAction(action) {
    yield put({
        type: DISPLAY_LOADING,
    });

    try {
        const { data, status } = yield call(taskListService.getTaskApi);
        yield delay(800);

        if (status === STATUS_CODE.SUCCESS) {
            // After get data successfully, use put (similar to dispatch in redux-thunk)
            yield put({
                type: GET_TASK_API,
                taskList: data,
            });
        } else {
            console.log("error");
        }
    } catch (error) {
        console.log("error");
    }

    yield put({
        type: HIDE_LOADING,
    });
}

export function* followActionGetTaskApi() {
    yield takeLatest(GET_TASK_SAGA_API, getTaskApiAction);
}

/*
    06/02/2021 Camha wrote function addTaskApiAction
*/
function* addTaskApiAction(action) {
    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return taskListService.addTaskApi(taskName);
        });

        if (status === STATUS_CODE.SUCCESS) {
            // After get data successfully, use put (similar to dispatch in redux-thunk)
            yield put({
                type: GET_TASK_SAGA_API,
            });
            yield put({
                type: DISPLAY_LOADING,
            });
            yield delay(500);
        }
        yield put({
            type: HIDE_LOADING,
        });
    } catch (error) {
        console.log("error");
    }
}

export function* followActionAddTaskApi() {
    yield takeLatest(ADD_TASK_SAGA_API, addTaskApiAction);
}

/*
    06/02/2021 Camha wrote function completeTaskApiAction
*/
function* completeTaskApiAction(action) {
    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return taskListService.completeTaskApi(taskName);
        });

        if (status === STATUS_CODE.SUCCESS) {
            // After get data successfully, use put (similar to dispatch in redux-thunk)
            yield put({
                type: GET_TASK_SAGA_API,
            });
            yield put({
                type: DISPLAY_LOADING,
            });
            yield delay(500);
        }
        yield put({
            type: HIDE_LOADING,
        });
    } catch (error) {
        console.log("error");
    }
}

export function* followActionCompleteTaskApi() {
    yield takeLatest(COMPLETE_TASK_SAGA_API, completeTaskApiAction);
}
/*
    06/02/2021 Camha wrote function rejectTaskApiAction
*/
function* rejectTaskApiAction(action) {
    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return taskListService.rejectTaskApi(taskName);
        });

        if (status === STATUS_CODE.SUCCESS) {
            // After get data successfully, use put (similar to dispatch in redux-thunk)
            yield put({
                type: GET_TASK_SAGA_API,
            });
            yield put({
                type: DISPLAY_LOADING,
            });
            yield delay(500);
        }
        yield put({
            type: HIDE_LOADING,
        });
    } catch (error) {
        console.log("error");
    }
}

export function* followActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_SAGA_API, rejectTaskApiAction);
}
/*
    06/02/2021 Camha wrote function deleteTaskApiAction
*/
function* deleteTaskApiAction(action) {
    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return taskListService.deleteTaskApi(taskName);
        });

        if (status === STATUS_CODE.SUCCESS) {
            // After get data successfully, use put (similar to dispatch in redux-thunk)
            yield put({
                type: GET_TASK_SAGA_API,
            });
            yield put({
                type: DISPLAY_LOADING,
            });
            yield delay(500);
        }
        yield put({
            type: HIDE_LOADING,
        });
    } catch (error) {
        console.log("error");
    }
}

export function* followActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_SAGA_API, deleteTaskApiAction);
}
