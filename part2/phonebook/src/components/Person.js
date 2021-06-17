import React from "react";

function Person(props) {
    return (
        <p>
            {props.person.name} {props.person.number}
            <button
                onClick={props.handleDeletePerson(
                    props.person.id,
                    props.person.name
                )}
            >
                delete
            </button>
        </p>
    );
}

export default Person;
