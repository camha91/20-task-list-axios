import Axios from "axios";
import { DOMAIN } from "../utils/constants/settingSystem";

export class TaskListService {
    // constructor() {}

    getTaskApi = () => {
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: "GET",
        });
    };

    addTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: "POST",
            data: { taskName: taskName },
        });
    };
}

export const taskListService = new TaskListService();
