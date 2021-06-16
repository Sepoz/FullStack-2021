import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        let newPersonObject = {
            name: newName,
            id: persons.length + 1,
        };

        setPersons(persons.concat(newPersonObject));
        setNewName("");
    }

    function handleNewNote(event) {
        setNewName(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNewNote} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person, i) => {
                return <p key={i}>{person.name}</p>;
            })}
        </div>
    );
};

export default App;
