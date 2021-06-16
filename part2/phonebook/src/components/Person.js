import React from "react";

function Person(props) {
    return (
        <p>
            {props.person.name} {props.person.phoneNumber}
        </p>
    );
}

export default Person;
