import React, { useState } from "react";
import { Prompt } from "react-router";

export default function Login(props) {
    const [userLogin, setUserLogin] = useState({
        userName: "",
        password: "",
        status: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newUserLogin = {
            ...userLogin,
            [name]: value,
        };

        let valid = true;

        for (let key in newUserLogin) {
            if (key !== "status") {
                if (newUserLogin[key].trim() === "") {
                    valid = false;
                }
            }
        }

        if (valid) {
            newUserLogin.status = true;
        } else {
            newUserLogin.status = false;
        }
        setUserLogin(newUserLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (
            userLogin.userName === "camha91" &&
            userLogin.password === "helloReact"
        ) {
            // if success go back to last page
            props.history.goBack();
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            // Or go to a specific page
            // props.history.push("/home");
            // Or replace the current page with a replacement page
            // props.history.replace("/contact");
        } else {
            alert("Login fail!");
            return;
        }
    };
    return (
        <form className="container" onSubmit={handleLogin}>
            <h3 className="display-4">Login</h3>
            <div className="form-group">
                <p>User Name</p>
                <input
                    name="userName"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <p>Password</p>
                <input
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-success">Login</button>
            </div>
            <Prompt
                when={userLogin.status}
                message={(location) => {
                    return "Are you sure you want to leave this page?";
                }}
            />
        </form>
    );
}
