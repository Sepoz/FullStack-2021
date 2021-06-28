// eslint-disable-next-line no-unused-vars
const User = require("../models/user");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let likes = 0;

    blogs.map((blog) => {
        likes = likes + blog.likes;
    });
    return likes;
};

const mostLikes = (blogs) => {
    return blogs.reduce(function (prev, current) {
        return prev.likes > current.likes
            ? { author: prev.author, likes: prev.likes }
            : { author: current.author, likes: current.likes };
    });
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
};

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    usersInDb,
};
