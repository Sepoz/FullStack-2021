import React from "react";

function Total(props) {
    const [...parts] = props.parts;

    function sumTotal() {
        return parts.reduce(function (acc, part) {
            return acc + part.exercises;
        }, 0);
    }

    return <p>Total of {sumTotal()} exercises</p>;
}

export default Total;
