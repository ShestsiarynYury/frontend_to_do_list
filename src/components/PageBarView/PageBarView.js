import React from "react";
import "./PageBarView.css";

const PageBarView = (props) => {
    return (
        (props.maxPages <= 0)
        ?
            <div><span>invalid pages</span></div>
        :
            <div>
                <input id="page" type="number" min="1" max={props.maxPages} step="1" onChange={(event) => props.changePage(event.target.value)}  />
                <label>max-pages=</label>
                <label>{props.maxPages}</label>
            </div>
    );
};

export default PageBarView;