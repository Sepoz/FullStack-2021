import React, { useState, useEffect } from "react";

import servicePersons from "./services/persons";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import CompleteMessage from "./components/CompleteMessage";
import ErrorMessage from "./components/ErrorMessage";
import SearchPerson from "./components/SearchPerson";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [filteredPerson, setFilteredPerson] = useState("");
    const [completeMessage, setCompleteMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
                    })
                    .catch(() => {
                        setErrorMessage(
                            `${checkNewName.name} has already been removed from server`
                        );
                        setTimeout(() => {
                            setErrorMessage(null);
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

    // handle name filtering
    function handleNewFilter(event) {
        setFilteredPerson(event.target.value);

        let filtered = persons.filter(
            (person) =>
                person.name.toLowerCase().indexOf(event.target.value) !== -1
        );

        // api call to reset persons

        setPersons(filtered);
    }

    // handle name input
    function handleNewName(event) {
        setNewName(event.target.value);
    }

    // handle phone number input
    function handleNewPhoneNumber(event) {
        setNewPhoneNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {completeMessage !== null && (
                <CompleteMessage completeMessage={completeMessage} />
            )}
            {errorMessage !== null && (
                <ErrorMessage errorMessage={errorMessage} />
            )}

            <SearchPerson
                filteredPerson={filteredPerson}
                handleNewFilter={handleNewFilter}
            />

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
