import React from "react";


export default function FileButton(props){
    return(
        <button type="button" className="btn toggle-btn" aria-pressed={props.pressed}>
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    )
}