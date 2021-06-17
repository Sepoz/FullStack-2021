import React from "react";

import Person from "./Person";

function Persons(props) {
    return (
        <div>
            {props.persons.map((person) => {
                return (
                    <Person
                        key={person.id}
                        person={person}
                        handleDeletePerson={props.handleDeletePerson}
                    />
                );
            })}
        </div>
    );
}

export default Persons;
