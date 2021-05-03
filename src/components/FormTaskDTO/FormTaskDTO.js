import react from "react";
import "./FormTaskDTO.css";

const FormTaskDTO = (props) => {

    return (
        <div class="content">
            {
                (function () {
                    if (props.mode === "update") {
                        return <>
                            <div class="control">
                                <label>
                                    id:
                                    <input id="idTaskDTO" type="text" name="id" defaultValue={props.taskDTO.id} />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    name:
                                    <input id="nameTaskDTO" type="text" name="name" defaultValue={props.taskDTO.name} />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    priority:
                                    <select id="priorityTaskDTO" name="priority">
                                        <option selected={props.taskDTO.priority == "LOW" && true}>LOW</option>
                                        <option selected={props.taskDTO.priority == "MEDIUM" && true}>MEDIUM</option>
                                        <option selected={props.taskDTO.priority == "HIGH" && true}>HIGH</option>
                                    </select>
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time begin:
                                    <input id="dateBeginTaskDTO" type="date" name="date_begin" defaultValue={props.taskDTO.dateBegin} />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time end:
                                    <input id="dateEndTaskDTO" type="date" name="date_end" defaultValue={props.taskDTO.dateEnd} />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    ready:
                                    <input id="readyTaskDTO" type="checkbox" name="ready" checked={props.taskDTO.ready && true} />
                                </label>
                            </div>
                        </>
                    } else if (props.mode === "delete") {
                        return <>
                            <div class="control">
                                <label>
                                    id:
                                    <input id="idTaskDTO" type="text" name="id" value={props.taskDTO.id} disabled />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    name:
                                    <input id="nameTaskDTO" type="text" name="name" value={props.taskDTO.name} disabled />
                                </label>
                            </div>
                            <div class="control" >
                                <label>
                                    priority:
                                    <select id="priorityTaskDTO" name="priority" disabled>
                                        <option selected={props.taskDTO.priority == "LOW" && true}>LOW</option>
                                        <option selected={props.taskDTO.priority == "MEDIUM" && true}>MEDIUM</option>
                                        <option selected={props.taskDTO.priority == "HIGH" && true}>HIGH</option>
                                    </select>
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time begin:
                                    <input id="dateBeginTaskDTO" type="date" name="date_begin" value={props.taskDTO.dateBegin} disabled />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time end:
                                    <input id="dateEndTaskDTO" type="date" name="date_end" value={props.taskDTO.dateEnd} disabled />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    ready:
                                    <input id="readyTaskDTO" type="checkbox" name="ready" checked={props.taskDTO.ready && true} disabled/>
                                </label>
                            </div>
                        </>
                    } else {
                        return <>
                            <div class="control">
                                <label>
                                    name:
                                    <input id="nameTaskDTO" type="text" name="name" />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    priority:
                                    <select id="priorityTaskDTO" name="priority">
                                        <option>LOW</option>
                                        <option>MEDIUM</option>
                                        <option>HIGH</option>
                                    </select>
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time begin:
                                    <input id="dateBeginTaskDTO" type="date" name="date_begin" />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    time end:
                                    <input id="dateEndTaskDTO" type="date" name="date_end" />
                                </label>
                            </div>
                            <div class="control">
                                <label>
                                    ready:
                                    <input id="readyTaskDTO" type="checkbox" name="ready" />
                                </label>
                            </div>
                        </>
                    }
                }())
            }
        </div>
    );
}

export default FormTaskDTO;