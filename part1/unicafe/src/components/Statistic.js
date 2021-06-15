import React from "react";

function Statistic(props) {
    return (
        <div>
            {props.text}: {props.value}
        </div>
    );
}

export default Statistic;
