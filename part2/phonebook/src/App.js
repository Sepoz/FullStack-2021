import React, { useState, useEffect } from "react";

import servicePersons from "./services/persons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    useEffect(() => {
        servicePersons
            .getAllPersons()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        let checkNewName = persons.find((person) => person.name === newName);
        if (checkNewName !== undefined) {
            alert(`${newName} is already added to the Phonebook!`);
        } else {
            let newPersonObject = {
                name: newName,
                number: newPhoneNumber,
                id: persons.length + 1,
            };

            servicePersons
                .createNewPerson(newPersonObject)
                .then((returnedPersons) => {
                    setPersons(persons.concat(returnedPersons));
                    setNewName("");
                    setNewPhoneNumber("");
                });
        }
    }

    function handleNewName(event) {
        setNewName(event.target.value);
    }

    function handleNewPhoneNumber(event) {
        setNewPhoneNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                handleNewName={handleNewName}
                handleNewPhoneNumber={handleNewPhoneNumber}
                newName={newName}
                newPhoneNumber={newPhoneNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    );
};

export default App;
