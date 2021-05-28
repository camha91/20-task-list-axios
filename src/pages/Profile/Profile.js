import React from "react";
import { Redirect } from "react-router";

export default function Profile(props) {
    if (localStorage.getItem("userLogin")) {
        return <div>Profile</div>;
    } else {
        alert("Please login to see your profile!");
        return <Redirect to="/login" />;
    }
}
