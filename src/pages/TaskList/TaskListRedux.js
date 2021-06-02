import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTaskAction,
    completeTaskAction,
    delTaskAction,
    getTaskApiAction,
    rejectTaskAction,
} from "../../redux/actions/TaskListActions";

export default function TaskListRedux(props) {
    const { taskList } = useSelector((state) => state.TaskListReducer);
    console.log("Redux taskList: ", taskList);

    const [state, setState] = useState({
        values: {
            taskName: "",
        },
        errors: {
            taskName: "",
        },
    });

    const dispatch = useDispatch();

    const getTaskList = () => {
        dispatch(getTaskApiAction());
    };

    const renderTaskTodo = () => {
        return taskList

            .filter((item) => !item.status)
            .map((item, index) => {
                return (
                    <li key={index}>
                        <span>{item.taskName}</span>
                        <div className="buttons">
                            <button
                                type="button"
                                className="remove"
                                onClick={() => {
                                    delTask(item.taskName);
                                }}
                            >
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button
                                type="button"
                                className="complete"
                                onClick={() => {
                                    completeTask(item.taskName);
                                }}
                            >
                                <i className="far fa-check-circle" />
                                <i className="fas fa-check-circle" />
                            </button>
                        </div>
                    </li>
                );
            });
    };

    const renderTaskCompleted = () => {
        return taskList
            .filter((item) => item.status)
            .map((item, index) => {
                return (
                    <li key={index}>
                        <span>{item.taskName}</span>
                        <div className="buttons">
                            <button
                                type="button"
                                className="remove"
                                onClick={() => {
                                    delTask(item.taskName);
                                }}
                            >
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button
                                type="button"
                                className="complete"
                                onClick={() => {
                                    rejectTask(item.taskName);
                                }}
                            >
                                <i className="far fa-undo" />
                                <i className="fas fa-undo" />
                            </button>
                        </div>
                    </li>
                );
            });
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        const newValues = { ...state.values, [name]: value };

        const newErrors = { ...state.errors };

        const regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + " invalid!";
        } else {
            newErrors[name] = "";
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors,
        });
    };

    // Complete a task
    const completeTask = (taskName) => {
        dispatch(completeTaskAction(taskName));
    };

    // Reject a task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskAction(taskName));
    };

    // Delete a task
    const delTask = (taskName) => {
        dispatch(delTaskAction(taskName));
    };

    // Add a task
    const addTask = (e) => {
        e.preventDefault();

        console.log("addTask value: ", state.values.taskName);

        dispatch(addTaskAction(state.values.taskName));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        getTaskList();
        return () => {};
    }, []);

    return (
        <div className="card">
            <div className="card__header">
                <img src="./img/X2oObC4.png" alt="background pic" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={handleSubmit}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>May 29,2021</p>
                    </div>
                    <div className="card__add">
                        <input
                            onChange={handleChange}
                            name="taskName"
                            id="newTask"
                            type="text"
                            placeholder="Enter an activity..."
                        />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskCompleted()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}
