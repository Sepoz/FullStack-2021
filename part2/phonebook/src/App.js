import React, { useState } from "react";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phoneNumber: "040-1234567", id: 1 },
        { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const checkNewName = persons.find((person) => person.name === newName);
        if (checkNewName !== undefined) {
            alert(`${newName} is already added to the Phonebook!`);
        } else {
            let newPersonObject = {
                name: newName,
                phoneNumber: newPhoneNumber,
                id: persons.length + 1,
            };

            setPersons(persons.concat(newPersonObject));
            setNewName("");
            setNewPhoneNumber("");
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
