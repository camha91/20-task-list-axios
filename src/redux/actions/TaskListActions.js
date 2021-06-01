import Axios from "axios";
import { GET_TASK_API } from "../constant/TaskListContant";

// Action has 2 types:
// Action 1: Action immediately perform and change reducer
// Async action: Go through middleware before calling action 1 to perform

export const getTaskApiAction = () => {
    return (dispatch) => {
        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET",
        });

        promise.then((result) => {
            console.log(result.data);
            // if successful calling API, set state
            dispatch({
                type: GET_TASK_API,
                taskList: result.data,
            });

            console.log("successful");
        });

        promise.catch((err) => {
            console.log("Fail");
            console.log(err.response.data);
        });
    };
};

export const addTaskAction = (taskName) => {
    return (dispatch) => {
        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: taskName },
        });

        promise.then((result) => {
            dispatch(getTaskApiAction());

            alert("successful add task");
        });

        promise.catch((err) => {
            console.log("Fail to add task");
            alert(err.response.data);
        });
    };
};

export const delTaskAction = (taskName) => {
    return (dispatch) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE",
        });

        promise.then((result) => {
            alert(result.data);
            dispatch(getTaskApiAction());
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };
};

export const rejectTaskAction = (taskName) => {
    return (dispatch) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            dispatch(getTaskApiAction());
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };
};

export const completeTaskAction = (taskName) => {
    return (dispatch) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            dispatch(getTaskApiAction());
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };
};
