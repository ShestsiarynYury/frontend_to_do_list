import React from "react";
import "./FormInfo.css";

const FormInfo = (props) => {
    return (
        <div className="content">
            {props.message}
        </div>
    );
}

export default FormInfo;