import React, { useState } from "react";

export default function Login(props) {
    const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (
            userLogin.userName === "camha91" &&
            userLogin.password === "helloReact"
        ) {
            // if success go back to last page
            // props.history.goBack();
            // Or go to a specific page
            // props.history.push("/home");
            // Or replace the current page with a replacement page
            props.history.replace("/contact");
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
        </form>
    );
}
