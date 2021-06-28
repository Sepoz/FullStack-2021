const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("../utils/list_helper");
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });

    await user.save();
});

describe("test /api/users is working", () => {
    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "frank",
            name: "franco battiato",
            password: "lacura",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        console.log(usersAtEnd);

        const usernames = usersAtEnd.map((user) => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test("get populated users", async () => {
        const users = await api.get("/api/users");
        console.log(users.body);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
