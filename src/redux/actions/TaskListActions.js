import { GET_TASK_API } from "../constant/TaskListContant";
import Axios from "axios";

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
