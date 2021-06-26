const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const findBlogs = await Blog.find({});
    response.json(findBlogs);
});

blogsRouter.post("/", async (request, response) => {
    if (request.body.likes === undefined) {
        request.body.likes = 0;
    } else if (
        request.body.title === undefined ||
        request.body.url === undefined
    ) {
        return response.status(400).json({ error: "missing title or url" });
    }

    const blog = new Blog(request.body);

    const saveBlog = await blog.save();
    response.status(201).json(saveBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.patch("/:id", async (request, response) => {
    const updatedLikes = {
        likes: request.body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        updatedLikes,
        {
            new: true,
        }
    );
    response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
