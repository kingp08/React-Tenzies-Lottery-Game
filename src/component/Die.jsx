import React from "react"

export default function Die(props) {
    return (
        <div 
        className={`die-square ${props.held == true ? "held" : ""}`}
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}