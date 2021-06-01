import Axios from "axios";
import { GET_TASK_API } from "../constant/TaskListContant";

// Action has 2 types:
// Action 1: Action immediately perform and change reducer
// Async action: Go through middleware before calling action 1 to perform

export const getTaskApiAction = () => {
    return async (dispatch) => {
        try {
            const { data, status, ...res } = await Axios({
                url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
                method: "GET",
            });

            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data,
                });
            }
        } catch (err) {
            alert(err.response.data);
        }
    };
};

export const addTaskAction = (taskName) => {
    return async (dispatch) => {
        try {
            const { data, status, ...res } = await Axios({
                url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
                method: "POST",
                data: { taskName: taskName },
            });

            if (status === 200) {
                dispatch(getTaskApiAction());
            }
        } catch (err) {
            alert(err.response.data);
        }
    };
};

export const delTaskAction = (taskName) => {
    return async (dispatch) => {
        try {
            const { data, status, ...res } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: "DELETE",
            });

            if (status === 200) {
                dispatch(getTaskApiAction());
            }
        } catch (err) {
            alert(err.response.data);
        }
    };
};

export const rejectTaskAction = (taskName) => {
    return async (dispatch) => {
        try {
            const { data, status, ...res } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: "PUT",
            });

            if (status === 200) {
                dispatch(getTaskApiAction());
            }
        } catch (err) {
            alert(err.response.data);
        }
    };
};

export const completeTaskAction = (taskName) => {
    return async (dispatch) => {
        try {
            const { data, status, ...res } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: "PUT",
            });

            if (status === 200) {
                dispatch(getTaskApiAction());
            }
        } catch (err) {
            alert(err.response.data);
        }
    };
};
