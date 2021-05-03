import React from "react";
import "./ModalLink.css";

const ModalLink = (props) => {
    return (
        <a href="#" onClick={
            () => {
                props.activate();
            }
        }>
            {props.name}
        </a>
    );
};

export default ModalLink;