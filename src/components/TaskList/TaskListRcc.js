import React, { Component } from "react";
import Axios from "axios";
import "./TaskList.css";

export default class TaskListRcc extends Component {
    state = {
        taskList: [],
        values: {
            taskName: "",
        },
        errors: {
            taskName: "",
        },
    };

    renderTaskTodo = () => {
        return this.state.taskList
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
                                    this.delTask(item.taskName);
                                }}
                            >
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button
                                type="button"
                                className="complete"
                                onClick={() => {
                                    this.completeTask(item.taskName);
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

    renderTaskCompleted = () => {
        return this.state.taskList
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
                                    this.delTask(item.taskName);
                                }}
                            >
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button
                                type="button"
                                className="complete"
                                onClick={() => {
                                    this.rejectTask(item.taskName);
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

    handleChange = (e) => {
        const { value, name } = e.target;
        console.log(value, name);
        const newValues = { ...this.state.values, [name]: value };

        const regexString = /^[a-z A-Z]+$/;

        let newErrors = { ...this.state.errors };

        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + " invalid!";
        } else {
            newErrors = "";
        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors,
        });
    };

    getTaskList = () => {
        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET",
        });

        promise.then((result) => {
            console.log(result.data);
            // if successful calling API, set state
            this.setState({ taskList: result.data });

            console.log("successful get all task");
        });

        promise.catch((err) => {
            console.log("Fail to get all task");
            console.log(err.response.data);
        });
    };

    // Complete a task
    completeTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            this.getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Reject a task
    rejectTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT",
        });

        promise.then((result) => {
            alert(result.data);
            this.getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Delete a task
    delTask = (taskName) => {
        const promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE",
        });

        promise.then((result) => {
            alert(result.data);
            this.getTaskList();
        });

        promise.catch((error) => {
            alert(error.response.data);
        });
    };

    // Add a task
    addTask = (e) => {
        e.preventDefault();

        console.log("addTask value: ", this.state.values.taskName);

        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: this.state.values.taskName },
        });

        promise.then((result) => {
            this.getTaskList();

            alert("successful add task");
        });

        promise.catch((err) => {
            console.log("Fail to add task");
            alert(err.response.data);
        });
    };

    componentDidMount = () => {
        this.getTaskList();
    };

    render() {
        return (
            <form onSubmit={() => {}}>
                <div className="card">
                    <div className="card__header">
                        <img src="./img/X2oObC4.png" alt="background pic" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>May 29,2021</p>
                            </div>
                            <div className="form-group">
                                <div className="card__add">
                                    <input
                                        onChange={this.handleChange}
                                        name="taskName"
                                        id="newTask"
                                        type="text"
                                        placeholder="Enter an activity..."
                                    />
                                    <button id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <p className="text text-danger">
                                    {this.state.errors.taskName}
                                </p>
                            </div>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskTodo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskCompleted()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
