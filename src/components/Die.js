import React from "react";

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }
    return (
        <div className="die center">
            <h2 onClick={props.holdDice} style={styles} className="die-num center">{props.value}</h2>
        </div>
    )
}

export default Die;