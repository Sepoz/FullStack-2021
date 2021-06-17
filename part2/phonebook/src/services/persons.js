import axios from "axios";

const baseURL = "http://localhost:3001/persons";

function getAllPersons() {
    return axios.get(baseURL).then((res) => res.data);
}

function createNewPerson(personObject) {
    return axios.post(baseURL, personObject).then((res) => res.data);
}

export default {
    getAllPersons,
    createNewPerson,
};
