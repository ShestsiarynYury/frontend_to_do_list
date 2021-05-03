import React, { useState } from "react";
import "./ListItemsTableView.css";

const ListItemsTableView = (props) => {

    return (
        <div>
            {
                props.items.length != 0 
                ?
                    <table>
                        <thead>
                            <tr>
                                {
                                    Object.keys(props.items[0]).map((key) => {
                                        return <th>{key}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.items.map((item) => {
                                    return <tr
                                            onClick={
                                                (event) => {
                                                    if (event.currentTarget.className === "selected") {
                                                        event.currentTarget.className = "";
                                                        props.selectTaskDTO({});
                                                    } else {
                                                        // reset all
                                                        let table = event.currentTarget.offsetParent;
                                                        for (let i = 0; i < table.rows.length; i++) {
                                                            table.rows[i].className = "";
                                                        }
                                                            // set 'selected'
                                                            event.currentTarget.className = "selected";
                                                        
                                                        // parse taskDTO
                                                        let taskDTO = {};
                                                        taskDTO.id = event.currentTarget.children[0].innerText;
                                                        taskDTO.name = event.currentTarget.children[1].innerText;
                                                        taskDTO.priority = event.currentTarget.children[2].innerText;
                                                        taskDTO.dateBegin = new Date().toISOString(event.currentTarget.children[3].innerText).substring(0, 10);
                                                        taskDTO.dateEnd = new Date().toISOString(event.currentTarget.children[4].innerText).substring(0, 10);
                                                        if (event.currentTarget.children[5].innerText === "no") {
                                                            taskDTO.ready = false;
                                                        } else {
                                                            taskDTO.ready = true;
                                                        }

                                                        props.selectTaskDTO(taskDTO);
                                                    }
                                                }
                                            }>
                                                {
                                                    Object.keys(props.items[0]).map((key) => {
                                                        if (key === "ready") {
                                                            if (item[key] === true)
                                                                return <td>yes</td>
                                                            else
                                                            return <td>no</td>
                                                        } else {
                                                            return <td>{item[key]}</td>
                                                        }
                                                    })
                                                }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                :
                    <span>not data</span>
            }
        </div>
    );
};

export default ListItemsTableView;