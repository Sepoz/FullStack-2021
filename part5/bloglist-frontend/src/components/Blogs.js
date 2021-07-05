import React from "react";
import Blog from "./Blog";

const Blogs = (props) => {
    const { blogs } = props;

    const sortedBlogs = () => {
        return blogs.sort((a, b) => {
            return b.likes - a.likes;
        });
    };

    return (
        <div>
            <h1>Blogs</h1>
            {sortedBlogs().map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Blogs;
