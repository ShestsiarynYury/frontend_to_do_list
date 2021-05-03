import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalWindow.css";

const ModalWindow = (props) => {

    return (
        ReactDOM.createPortal(
            <div className="modal" style={props.hidden ? {display: "none"} : {display: "block"}}>
            <div className="modal-header">
                <span>{props.name}</span>
                <span className="close-btn" 
                    onClick={
                        ()=> {
                            // очищаем модальное окно
                            props.close();
                        }
                    }>
                    &times;
                </span>
            </div>
            <div className="modal-content">
                {props.children}
            </div>
            <div className="modal-footer">
                <button style={props.actionHidden ? {display: "none"} : {display: ""}}
                    onClick={
                        ()=> {
                            let taskDTO = {};
                            taskDTO.name = document.getElementById("nameTaskDTO").value;
                            taskDTO.priority = document.getElementById("priorityTaskDTO").value;
                            taskDTO.dateBegin = document.getElementById("dateBeginTaskDTO").value;
                            taskDTO.dateEnd = document.getElementById("dateEndTaskDTO").value;
                            if (document.getElementById("readyTaskDTO").checked) {
                                taskDTO.ready = true;
                            } else {
                                taskDTO.ready = false;
                            }
                            if (props.actionName === "create") {
                                props.actionFunction(taskDTO);
                            } else if (props.actionName === "update") {
                                taskDTO.id = document.getElementById("idTaskDTO").value;
                                props.actionFunction(taskDTO);
                            } else if (props.actionName === "delete") {
                                taskDTO.id = document.getElementById("idTaskDTO").value;
                                props.actionFunction(taskDTO.id);
                            } else {

                            }
                            //
                        }
                    }
                >
                    {props.actionName}
                </button>
            </div>
        </div>, document.body)
    );
}

export default ModalWindow;