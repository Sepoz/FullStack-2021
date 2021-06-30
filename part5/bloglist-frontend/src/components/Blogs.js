import React from "react";
import Blog from "./Blog";

function Blogs(props) {
    const { blogs } = props;

    return (
        <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
}

export default Blogs;
