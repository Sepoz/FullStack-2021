import React, { useState, useEffect } from "react";

import servicePersons from "./services/persons";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import CompleteMessage from "./components/CompleteMessage";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [completeMessage, setCompleteMessage] = useState(null);

    // get persons from db
    useEffect(() => {
        servicePersons
            .getAllPersons()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    // form submission handler
    // async/await workaround: getAllPersons is executed before updatePhoneNumber
    async function handleSubmit(event) {
        event.preventDefault();

        let checkNewName = persons.find((person) => person.name === newName);
        if (checkNewName !== undefined) {
            if (
                window.confirm(
                    `${newName} is already added to the Phonebook, replace the old number with a new one?`
                )
            ) {
                await servicePersons
                    .updatePhoneNumber(checkNewName.id, {
                        ...checkNewName,
                        number: newPhoneNumber,
                    })
                    .then(() => {
                        setCompleteMessage(
                            `${checkNewName.name} is now updated!`
                        );
                        setTimeout(() => {
                            setCompleteMessage(null);
                        }, 2000);
                    });

                await servicePersons
                    .getAllPersons()
                    .then((initialPersons) => setPersons(initialPersons));
            }
        } else {
            let newPersonObject = {
                name: newName,
                number: newPhoneNumber,
                id: persons.length + 1,
            };

            servicePersons
                .createNewPerson(newPersonObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName("");
                    setNewPhoneNumber("");
                })
                .then(() => {
                    setCompleteMessage(`You added ${newName}!`);
                    setTimeout(() => {
                        setCompleteMessage(null);
                    }, 2000);
                });
        }
    }

    // handle name input
    function handleNewName(event) {
        setNewName(event.target.value);
    }

    // handle phone number input
    function handleNewPhoneNumber(event) {
        setNewPhoneNumber(event.target.value);
    }
    // handle deleting person
    function handleDeletePerson(id, name) {
        // async/await workaround: getAllPersons is executed before deletePerson
        return async function () {
            if (window.confirm(`Do you really want to delete ${name}?`)) {
                await servicePersons.deletePerson(id);

                // reload persons array
                await servicePersons
                    .getAllPersons()
                    .then((initialPersons) => setPersons(initialPersons))
                    .then(() => {
                        setCompleteMessage(`${name} is gone...`);
                        setTimeout(() => {
                            setCompleteMessage(null);
                        }, 2000);
                    });
            }
        };
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {completeMessage !== null && (
                <CompleteMessage completeMessage={completeMessage} />
            )}
            <PersonForm
                handleSubmit={handleSubmit}
                handleNewName={handleNewName}
                handleNewPhoneNumber={handleNewPhoneNumber}
                newName={newName}
                newPhoneNumber={newPhoneNumber}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                handleDeletePerson={handleDeletePerson}
            />
        </div>
    );
};

export default App;
