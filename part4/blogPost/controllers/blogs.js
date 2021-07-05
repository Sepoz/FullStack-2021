const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../utils/config");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
};

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (body.likes === undefined) {
        body.likes = 0;
    } else if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({ error: "missing title or url" });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    const saveBlog = await blog.save();
    user.blogs = user.blogs.concat(saveBlog._id);
    await user.save();

    response.status(201).json(saveBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body;
    const updatedLikes = {
        ...body,
        likes: request.body.likes,
    };
    console.log(updatedLikes);
    console.log(response);

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
