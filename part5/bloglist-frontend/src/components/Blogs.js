import React from "react";
import Blog from "./Blog";

function Blogs(props) {
    const { blogs } = props;

    return (
        <div>
            <h1>Blogs</h1>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
}

export default Blogs;
