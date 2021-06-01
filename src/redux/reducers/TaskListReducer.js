import { GET_TASK_API } from "../constant/TaskListContant";

const initialState = {
    taskList: [],
};

const TaskListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_API: {
            state.taskList = action.taskList;
            return { ...state };
        }
        default:
            return state;
    }
};

export default TaskListReducer;
