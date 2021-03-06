import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./TaskList.css";

export default function TaskListRfc(props) {
    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: "",
        },
        errors: {
            taskName: "",
        },
    });

    const renderTaskTodo = () => {
        console.log("Rfc taskList: ", state.taskList);
        return state.taskList
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
        return state.taskList
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
        console.log(value, name);

        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        const regexString = /^[a-z A-Z]+$/;

        const newErrors = { ...state.errors };

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

    const getTaskList = () => {
        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET",
        });

        promise.then((result) => {
            console.log(result.data);
            // if successful calling API, set state
            setState({
                ...state,
                taskList: result.data,
            });

            console.log("successful");
        });

        promise.catch((err) => {
            console.log("Fail");
            console.log(err.response.data);
        });
    };

    // Complete a task
    const completeTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Reject a task
    const rejectTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Delete a task
    const delTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE",
        });

        promise.then((result) => {
            alert(result.data);
            getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Add a task
    const addTask = (e) => {
        e.preventDefault();

        console.log("addTask value: ", state.values.taskName);

        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: state.values.taskName },
        });

        promise.then((result) => {
            getTaskList();

            alert("successful add task");
        });

        promise.catch((err) => {
            console.log("Fail to add task");
            alert(err.response.data);
        });
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
                    <div className="form-group">
                        <div className="card__add">
                            <input
                                onChange={handleChange}
                                name="taskName"
                                id="newTask"
                                type="text"
                                placeholder="Enter an activity..."
                            />
                            <button
                                id="addItem"
                                type="submit"
                                onClick={addTask}
                            >
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className="text text-danger">
                            {state.errors.taskName}
                        </p>
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
