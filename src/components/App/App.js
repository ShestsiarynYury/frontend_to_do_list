import React, { useEffect, useState } from "react";
import "./App.css";
import { sizePage, url} from "../../properties";
import ListItemsTableView from "../ListItemsTableView/ListItemsTableView";
import PageBarView from "../PageBarView/PageBarView";
import ModalLink from "../ModalLink/ModalLink";
import ModalWindow from "../ModalWindow/ModalWindow";
import FormTaskDTO from "../FormTaskDTO/FormTaskDTO";
import FormInfo from "../FormInfo/FormInfo";

function App() {
    const [totalPages, setTotalPages] = useState(0);
    const [currentListTask, setCurrentListTask] = useState([]);
    const [modalWindow, setModalWindow] = useState({
        type: "",
        name: "name",
        message: "message",
        hidden: true,
        actionName: "action",
        actionFunction: () => {},
        actionHidden: false
    });
    const[taskDTO, setTaskDTO] = useState({});

    useEffect(() => {
        fetch(
            url + "tasks/pages/size=" + sizePage,
            {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(setTotalPages)
    });

    const sendTaskDTO = (taskDTO) => {
        fetch(
            url + "tasks",
            {
                method: "POST",
                body: JSON.stringify(taskDTO),
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then(
            function(response) {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("failed");
            }
        )
        .then(
            function(json) {
                setModalWindow({
                    type: "info",
                    name: "create new task",
                    message: "operation successfully",
                    hidden: false,
                    actionName: "",
                    actionFunction: () => {},
                    actionHidden: true
                });
                clearPageBarInput();
                setCurrentListTask([]);
            }
        )
        .catch(
            function(error) {
                setModalWindow({
                    type: "info",
                    name: "create new task",
                    message: "operation failed",
                    hidden: false,
                    actionName: "",
                    actionFunction: () => {},
                    actionHidden: true
                });
                clearPageBarInput();
                setCurrentListTask([]);
                
            }
        )
    };

    const sendTaskId = (id) => {
        console.log(id);
        fetch(
            url + "tasks/" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then(
            function(response) {
                if (response.ok) {
                    return response.text();
                }

                throw new Error("failed");
            }
        )
        .then(
            function(text) {
                setModalWindow({
                    type: "info",
                    name: "delete selected task",
                    message: "operation successfully",
                    hidden: false,
                    actionName: "",
                    actionFunction: () => {},
                    actionHidden: true
                });
                clearPageBarInput();
                setCurrentListTask([]);
            }
        )
        .catch(
            function(error) {            
                setModalWindow({
                    type: "info",
                    name: "delete selected task",
                    message: "operation failed",
                    hidden: false,
                    actionName: "",
                    actionFunction: () => {},
                    actionHidden: true
                });
                clearPageBarInput();
                setCurrentListTask([]);
            }   
        )
    };

    const clearTable = () => {
        let table = document.getElementsByTagName("table")[0];
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].className = "";
        }
    }

    const clearPageBarInput = () => {
        document.querySelectorAll("#page")[0].value = "";
    }

    const turnPage = (value) => {
        let page = value - 1;
        if (isNaN(page) || page < 0) {

        } else {
            fetch(
                url + "tasks/page=" + page + "/size=" + sizePage,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            )
            .then(
                function(response) {
                    if (response.ok) {
                        return response.json();
                    }
    
                    throw new Error("failed");
                }
            )
            .then(val => {
                setCurrentListTask(val); clearTable();
            })
            .catch(
                function(error) {
                    setModalWindow({
                        type: "info",
                        name: "turn the page",
                        message: "invalid page",
                        hidden: false,
                        actionName: "",
                        actionFunction: () => {setTaskDTO({})},
                        actionHidden: true
                    })
                }
            )
        }
    };

    return (
        <>
            <h1>To Do List</h1>
            <div id="modal-bar">
                <ModalLink 
                    name="create new task" 
                    activate={
                        () => {
                            setModalWindow({
                                type: "create",
                                name: "create new task",
                                message: "",
                                hidden: false,
                                actionName: "create",
                                actionFunction: sendTaskDTO,
                                actionHidden: false
                            });
                        }
                }/>
                <ModalLink 
                    name="update selected task" 
                    activate={
                        () => {
                            if (Object.keys(taskDTO).length === 0) {
                                setModalWindow({
                                    type: "info",
                                    name: "update new task",
                                    message: "the nothing is choosing",
                                    hidden: false,
                                    actionName: "",
                                    actionFunction: () => {},
                                    actionHidden: true
                                });
                            }
                            else {
                                setModalWindow({
                                    type: "update",
                                    name: "update selected task",
                                    message: "",
                                    hidden: false,
                                    actionName: "update",
                                    actionFunction: sendTaskDTO,
                                    actionHidden: false
                                });
                            }
                        }
                }/>
                <ModalLink 
                    name="delete selected task" 
                    activate={
                        () => {
                            if (Object.keys(taskDTO).length === 0) {
                                setModalWindow({
                                    type: "info",
                                    name: "update new task",
                                    message: "the nothing is choosing",
                                    hidden: false,
                                    actionName: "",
                                    actionFunction: () => {},
                                    actionHidden: true
                                });
                            } else {
                                setModalWindow({
                                    type: "delete",
                                    name: "delete selected task",
                                    message: "you actioally to want delete selected object?",
                                    hidden: false,
                                    actionName: "delete",
                                    actionFunction: sendTaskId,
                                    actionHidden: false
                                });
                            }
                        }
                }/>
            </div>
            <ListItemsTableView items = {currentListTask} selectTaskDTO={setTaskDTO} />
            <div id="page-bar">
                <PageBarView maxPages={totalPages} changePage={turnPage} />
            </div>
            <ModalWindow 
                name={modalWindow.name}
                hidden={modalWindow.hidden} 
                close={
                    () => {
                        setModalWindow({
                            type: "",
                            hidden: true,
                            name: "",
                            message: "",
                            actionName: "",
                            actionFunction: () => {},
                            actionHidden: true
                        });
                    }
                }
                actionName={modalWindow.actionName}
                actionFunction={modalWindow.actionFunction}
                actionHidden={modalWindow.actionHidden}
            >   
                {
                    (function () {
                        if (modalWindow.type === "info") {
                            return <FormInfo message={modalWindow.message} />
                        } else if (modalWindow.type === "create") {
                            return <FormTaskDTO taskDTO={{}} mode="create" />
                        } else if (modalWindow.type === "update") {
                            return <FormTaskDTO taskDTO={taskDTO} mode="update" />
                        } else if (modalWindow.type === "delete") {
                            return <FormTaskDTO taskDTO={taskDTO} mode="delete" />
                        } else {
                            return <div>error</div>
                        }
                    }())
                }
            </ModalWindow>
        </>
    );
}

export default App;