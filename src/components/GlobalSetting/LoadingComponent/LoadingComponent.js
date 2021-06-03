import React from "react";
import styleLoading from "./LoadingComponent.module.css";
import loadingGif from "../../../assets/imgLoading/original.gif";
import { useSelector } from "react-redux";

export default function LoadingComponent() {
    const { isLoading } = useSelector((state) => state.LoadingReducer);

    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={loadingGif} alt="loading gif" />
            </div>
        );
    } else {
        return "";
    }
}
