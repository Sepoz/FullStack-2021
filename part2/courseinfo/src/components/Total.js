import React from "react";

function Total(props) {
    const [...parts] = props.parts;

    function sumTotal() {
        let sum = 0;

        parts.forEach((part) => {
            sum = sum + part.exercises;
        });

        return sum;
    }

    return <p>Total of {sumTotal()} exercises</p>;
}

export default Total;
