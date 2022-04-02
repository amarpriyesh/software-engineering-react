import React from "react";
import ReactDOM from "react-dom";
import MyTuits from "./my-tuits";

const LoadImg = ({user})  => {
    return (

        <img
            src={user.profilePhoto}
            alt="new"
        />
    );
}


export default LoadImg;