import React from "react";

function SearchPerson(props) {
    return (
        <div>
            search:{" "}
            <input
                value={props.filteredPerson}
                onChange={props.handleNewFilter}
            />
        </div>
    );
}

export default SearchPerson;
