const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe("api tests", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("blogs in db has length 2", async () => {
        const response = await api.get("/api/blogs");

        expect(response.body).toHaveLength(2);
    });

    test("blogs in db has id property", async () => {
        const response = await api.get("/api/blogs");
        response.body.map((blog) => {
            expect(blog.id).toBeDefined();
        });
    });

    test("post request successfully creates a new blog post", async () => {
        const testBlog = {
            title: "Testing POST",
            author: "Roberto Mancini",
            url: "https://reactpatterns.com/",
            likes: 21,
        };

        const testPost = await api
            .post("/api/blogs")
            .set("Content-Type", "application/json")
            .send(testBlog);

        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(3);
        expect(response.body[2]).toEqual({
            title: "Testing POST",
            author: "Roberto Mancini",
            url: "https://reactpatterns.com/",
            likes: 21,
            id: testPost.body.id,
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });
});
