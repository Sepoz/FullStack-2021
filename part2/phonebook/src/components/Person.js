import React from "react";

function Person(props) {
    return (
        <p>
            {props.person.name} {props.person.number}
        </p>
    );
}

export default Person;
