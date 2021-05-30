import React, { useState } from "react";
import "./TaskList.css";
import Axios from "axios";

export default function TaskListRfc(props) {
    const [taskList, setTaskList] = useState([]);

    const getTaskList = () => {
        const promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET",
        });

        promise.then((result) => {
            console.log(result.data);
            // if successful calling API, set state
            setTaskList({ taskList: result.data });

            console.log("successful");
        });

        promise.catch((err) => {
            console.log("Fail");
            console.log(err.response.data);
        });
    };

    const renderTaskTodo = () => {
        return taskList
            .filter((item) => !item.status)
            .map((item, index) => {
                return (
                    <li key={index}>
                        <span>{item.taskName}</span>
                        <div className="buttons">
                            <button className="remove">
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button className="complete">
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
                            <button className="remove">
                                <i className="fa fa-trash-alt" />
                            </button>
                            <button className="complete">
                                <i className="far fa-check-circle" />
                                <i className="fas fa-check-circle" />
                            </button>
                        </div>
                    </li>
                );
            });
    };

    return (
        <div>
            <button onClick={() => getTaskList()}>Get Task List</button>
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
                        <div className="card__add">
                            <input
                                id="newTask"
                                type="text"
                                placeholder="Enter an activity..."
                            />
                            <button id="addItem">
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
                </div>
            </div>
        </div>
    );
}
