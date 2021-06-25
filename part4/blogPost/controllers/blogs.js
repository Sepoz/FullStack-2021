const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const findBlogs = await Blog.find({});
    response.json(findBlogs);
});

blogsRouter.post("/", async (request, response) => {
    console.log(request.body);
    const blog = new Blog(request.body);

    const saveBlog = await blog.save();
    response.status(201).json(saveBlog);
});

module.exports = blogsRouter;
