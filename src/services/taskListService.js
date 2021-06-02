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
}

export const taskListService = new TaskListService();
